using Application.Common.Helpers;
using Application.Common.Services.Interfaces;
using Application.Dtos;
using iText.IO.Font;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
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
                    var font = PdfFontFactory.CreateFont("../Application/Common/Fonts/OpenSans-Regular.ttf", 
                        PdfEncodings.IDENTITY_H, EmbeddingStrategy.FORCE_EMBEDDED);
                    document.SetFont(font);

                    document.Add(new Paragraph("Платформа закупівель «Перевага»").SetTextAlignment(TextAlignment.CENTER)
                        .SetFontSize(16).SetFontColor(new DeviceRgb(95, 207, 247)).SetMargin(0).SetPadding(0).SetBold());

                    document.Add(new Paragraph($"Замовлення №{order.Id} «{order.Title}»").SetTextAlignment(TextAlignment.CENTER)
                        .SetFontSize(16).SetMargin(0).SetPadding(0));

                    document.Add(CreateDateParagraph(pdf));

                    var color = new DeviceRgb(47, 203, 128);

                    document.Add(new Paragraph($"{(order.TransporterContactPerson != null ? "Адреса доставки" : "Адреса постачання")}: " +
                        $"{TransformAddress(order.DeliveryAddress)}").SetMargin(2));

                    if (order.ShipmentAddress != null) {
                        document.Add(new Paragraph($"Адреса відвантаження: {TransformAddress(order.ShipmentAddress)}").SetMargin(2));
                    }       
                    
                    document.Add(new Paragraph("Інформація про замовника").SetBold().SetFontColor(color));          
                    document.Add(CreateCompanyTable(order.BuyerContactPerson));

                    document.Add(new Paragraph("Інформація про постачальника").SetBold().SetFontColor(color));       
                    document.Add(CreateCompanyTable(order.SupplierContactPerson));

                    if (order.TransporterContactPerson != null) {
                        document.Add(new Paragraph("Інформація про перевізника").SetBold().SetFontColor(color));       
                        document.Add(CreateCompanyTable(order.TransporterContactPerson));
                    }
                   
                    document.Add(new Paragraph("Предмет(и) закупівель").SetBold().SetFontColor(color));
                    var requests = order.Requests.ToList();

                    for (int i = 0; i < requests.Count; i++) {
                        document.Add(new Paragraph($"{i+1}. {requests[i].ProcurementItemTitle}").SetMargin(2));  
                    }   

                    document.Add(CreatePriceTable(order.SupplierPrice, order.TransporterSum));
                } catch (Exception) {
                    return Result<byte[]>.Failure("Не вдалось згенерувати PDF-файл");
                } finally {
                    document.Close();
                }
                return Result<byte[]>.Success(ms.ToArray());
            }
        }   

        private static Table CreateCompanyTable(ContactPersonDto person) {
            var table = new Table(UnitValue.CreatePercentArray(new float[] {7.5f, 5.5f}));
            table.SetWidth(UnitValue.CreatePercentValue(100));
            table.SetTextAlignment(TextAlignment.LEFT);
            
            table.AddCell(CreateTableCell("Компанія", true));
            table.AddCell(CreateTableCell("Контактна особа", true));
            table.AddCell(CreateTableCell(person.CompanyTitle));
            table.AddCell(CreateTableCell(GetFullName(person)));
            table.AddCell(CreateTableCell($"Код ЄДРПОУ: {person.CompanyEdrpou}"));
            table.AddCell(CreateTableCell($"Пошта: {person.Email}"));
            table.AddCell(CreateTableCell($"Адреса: {TransformAddress(person.CompanyAddress)}"));

            return table;
        }   

        private static Table CreatePriceTable(decimal? supplierPrice, decimal? transporterSum) {
            var table = new Table(UnitValue.CreatePercentArray(new float[] {4, 3}));
            table.SetWidth(UnitValue.CreatePercentValue(60));
            table.SetTextAlignment(TextAlignment.LEFT);

            table.AddCell(CreateTableCell("Ціна від постачальника:", true));
            table.AddCell(CreateTableCell($"{supplierPrice.Value} (грн.)"));
            if (transporterSum != null) {
                table.AddCell(CreateTableCell("Ціна від перевізника:", true));
                table.AddCell(CreateTableCell($"{transporterSum.Value} (грн.)"));
            }
            table.AddCell(CreateTableCell("Сума:", true));
            table.AddCell(CreateTableCell($"{supplierPrice.Value + (transporterSum != null ? transporterSum.Value : 0)} (грн.)"));
            return table;
        }

        private static Cell CreateTableCell(string data, bool bold = false) {
            var cell = new Cell().Add(new Paragraph(data)).SetBorder(Border.NO_BORDER);
            if (bold) cell.SetBold();
            return cell;
        }

        private static Paragraph CreateDateParagraph(PdfDocument pdf) {
            var dateParagraph = new Paragraph(DateTime.Now.ToString("dd.MM.yyyy"));
            dateParagraph.SetWidth(UnitValue.CreatePointValue(100));
            dateParagraph.SetFixedPosition(pdf.GetDefaultPageSize().GetWidth() - 100, 
                pdf.GetDefaultPageSize().GetHeight() - 65, 100);
            return dateParagraph;
        }

        private static string TransformAddress(AddressDto address) {
            var data = new List<string> { address.City, address.Street, address.ZipCode };
            if (address.Region != null) {
                data.Insert(1, $"{address.Region} область");
            }
            if (address.BuildingNumber != null) {
            data.Insert(data.Count - 1, address.BuildingNumber);
            }
            return String.Join(", ", data);
        }     
        private static string GetFullName(ContactPersonDto person) {
            return $"{person.LastName} {person.FirstName} {person.MiddleName}";
        }
    }
}
