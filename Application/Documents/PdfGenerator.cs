using Application.Common.Helpers;
using Application.Dtos;
using iText.IO.Font;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using static iText.Kernel.Font.PdfFontFactory;

namespace Application.Documents
{
    public class PdfGenerator
    {
        public Result<byte[]> GeneratePdfDocument(OrderDto order) {
            // var writer = new PdfWriter("C:\\Dima\\Documents\\demo.pdf");
            // var pdf = new PdfDocument(writer);
            // var document = new Document(pdf);
            using (var ms = new MemoryStream()) {
                var writer = new PdfWriter(ms);
                var pdf = new PdfDocument(writer);
                var document = new Document(pdf);

                try {
                    var font = PdfFontFactory.CreateFont("../API/wwwroot/fonts/OpenSans-Regular.ttf", PdfEncodings.IDENTITY_H, EmbeddingStrategy.FORCE_EMBEDDED);
                    document.SetFont(font);

                    document.Add(new Paragraph($"Замовлення №{order.Id}").SetTextAlignment(TextAlignment.CENTER).SetFontSize(16).SetMargin(0).SetPadding(0));
                    document.Add(new Paragraph($"«{order.Title}»").SetTextAlignment(TextAlignment.CENTER).SetFontSize(16).SetMargin(2).SetPadding(0));

                    // document.Add(new Paragraph("Інформація про замовлення").SetBold());
                    // document.Add(new Paragraph("Номер: " + order.Id).SetMargin(2));
                    document.Add(new Paragraph("Адреса доставки: " + TransformAddress(order.DeliveryAddress)).SetMargin(2));
                    document.Add(new Paragraph("Адреса відвантаження: " + TransformAddress(order.ShipmentAddress)).SetMargin(2));
                    
                    document.Add(new Paragraph("Інформація про замовника").SetBold());          
                    document.Add(GenerateTable(order.BuyerContactPerson));

                    document.Add(new Paragraph("Інформація про постачальника").SetBold());       
                    document.Add(GenerateTable(order.SupplierContactPerson));

                    document.Add(new Paragraph("Інформація про перевізника").SetBold());       
                    document.Add(GenerateTable(order.TransporterContactPerson));

                    document.Add(new Paragraph("Предмети закупівель").SetBold());
                    var requests = order.Requests.ToList();

                    for (int i = 0; i < requests.Count; i++) {
                        document.Add(new Paragraph($"{i+1}. {requests[i].ProcurementItemTitle}").SetMargin(2));  
                        // document.Add(new Paragraph(requests[i].SubdivisionTitle));
                        // document.Add(new Paragraph($"Кількість: {requests[i].Quantity}"));
                    }   

                    // document.Add(new Paragraph($"Ціна від постачальника: {order.}").SetBold());
                } catch (Exception ex) {
                    return Result<byte[]>.Failure(ex.Message);
                } finally {
                    document.Close();
                }
                return Result<byte[]>.Success(ms.ToArray());
            }
        }   

        private Table GenerateTable(ContactPersonDto person) {
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
