using Application.Common.Helpers;
using Application.Common.Services.Interfaces;
using Application.Dtos;
using iText.IO.Font;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using static iText.Kernel.Font.PdfFontFactory;

namespace Application.Common.Services.Implementations
{
    public class DocumentGeneratorService : IDocumentGeneratorService
    {
        public Result<byte[]> GenerateDocument(OrderDto order) {
            using (var ms = new MemoryStream()) {
                var writer = new PdfWriter(ms);
                var pdf = new PdfDocument(writer);
                var document = new Document(pdf);

                try {
                    var font = PdfFontFactory.CreateFont("../API/wwwroot/fonts/OpenSans-Regular.ttf", PdfEncodings.IDENTITY_H, EmbeddingStrategy.FORCE_EMBEDDED);
                    document.SetFont(font);

                    document.Add(new Paragraph($"Замовлення №{order.Id}").SetTextAlignment(TextAlignment.CENTER).SetFontSize(16).SetMargin(0).SetPadding(0).SetBold());
                    document.Add(new Paragraph($"«{order.Title}»").SetTextAlignment(TextAlignment.CENTER).SetFontSize(16).SetMargin(2).SetPadding(0));

                    var color = new DeviceRgb(47, 203, 128);

                    document.Add(new Paragraph("Адреса доставки: " + TransformAddress(order.DeliveryAddress)).SetMargin(2));
                    document.Add(new Paragraph("Адреса відвантаження: " + TransformAddress(order.ShipmentAddress)).SetMargin(2));
                    
                    document.Add(new Paragraph("Інформація про замовника").SetBold().SetFontColor(color));          
                    document.Add(GenerateCompanyTable(order.BuyerContactPerson));

                    document.Add(new Paragraph("Інформація про постачальника").SetBold().SetFontColor(color));       
                    document.Add(GenerateCompanyTable(order.SupplierContactPerson));

                    document.Add(new Paragraph("Інформація про перевізника").SetBold().SetFontColor(color));       
                    document.Add(GenerateCompanyTable(order.TransporterContactPerson));

                    document.Add(new Paragraph("Предмет(и) закупівель").SetBold().SetFontColor(color));
                    var requests = order.Requests.ToList();

                    for (int i = 0; i < requests.Count; i++) {
                        document.Add(new Paragraph($"{i+1}. {requests[i].ProcurementItemTitle}").SetMargin(2));  
                        // document.Add(new Paragraph(requests[i].SubdivisionTitle));
                        // document.Add(new Paragraph($"Кількість: {requests[i].Quantity}"));
                    }   

                    // document.Add(new LineSeparator(new SolidLine()));

                    document.Add(GeneratePriceTable(order.SupplierPrice.Value, order.TransporterSum.Value));
                } catch (Exception) {
                    return Result<byte[]>.Failure("Не вдалось згенерувати PDF-файл");
                } finally {
                    document.Close();
                }
                return Result<byte[]>.Success(ms.ToArray());
            }
        }   

        private Table GenerateCompanyTable(ContactPersonDto person) {
            var table = new Table(UnitValue.CreatePercentArray(new float[] {7.5f, 5.5f}));
            table.SetWidth(UnitValue.CreatePercentValue(100));
            table.SetTextAlignment(TextAlignment.LEFT);
            
            table.AddCell(new Cell().Add(new Paragraph("Компанія").SetBold()).SetBorder(Border.NO_BORDER));
            table.AddCell(new Cell().Add(new Paragraph("Контактна особа").SetBold()).SetBorder(Border.NO_BORDER));
            table.AddCell(new Cell().Add(new Paragraph(person.CompanyName)).SetBorder(Border.NO_BORDER));
            table.AddCell(new Cell().Add(new Paragraph(getFullName(person))).SetBorder(Border.NO_BORDER));
            table.AddCell(new Cell().Add(new Paragraph("Код ЄДРПОУ: " + person.CompanyEdrpou)).SetBorder(Border.NO_BORDER));
            table.AddCell(new Cell().Add(new Paragraph("Пошта: " + person.Email)).SetBorder(Border.NO_BORDER));
            table.AddCell(new Cell().Add(new Paragraph("Адреса: " + TransformAddress(person.CompanyAddress))).SetBorder(Border.NO_BORDER));
            return table;
        }   

        private Table GeneratePriceTable(decimal supplierPrice, decimal transporterSum) {
            var table = new Table(UnitValue.CreatePercentArray(new float[] {4, 3}));
            table.SetWidth(UnitValue.CreatePercentValue(60));
            table.SetTextAlignment(TextAlignment.LEFT);

            table.AddCell(new Cell().Add(new Paragraph("Ціна від постачальника:").SetBold()).SetBorder(Border.NO_BORDER));
            table.AddCell(new Cell().Add(new Paragraph($"{supplierPrice} (грн.)")).SetBorder(Border.NO_BORDER));
            table.AddCell(new Cell().Add(new Paragraph("Ціна від перевізника:").SetBold()).SetBorder(Border.NO_BORDER));
            table.AddCell(new Cell().Add(new Paragraph($"{transporterSum} (грн.)")).SetBorder(Border.NO_BORDER));
            table.AddCell(new Cell().Add(new Paragraph("Сума:")).SetBorder(Border.NO_BORDER).SetBold());
            table.AddCell(new Cell().Add(new Paragraph($"{supplierPrice + transporterSum} (грн.)")).SetBorder(Border.NO_BORDER));
            return table;
        }

        private string TransformAddress(AddressDto address) {
            var data = new List<string> { address.City, address.Street, address.ZipCode };
            if (address.Region != null) {
                data.Insert(1, $"{address.Region} область");
            }
            if (address.BuildingNumber != null) {
            data.Insert(data.Count - 1, address.BuildingNumber);
            }
            return String.Join(", ", data);
        }     
        private string getFullName(ContactPersonDto person) {
            return $"{person.LastName} {person.FirstName} {person.MiddleName}";
        }
    }
}
