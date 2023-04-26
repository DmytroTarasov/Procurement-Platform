namespace Application.Dtos
{
    public class EmailDto
    {
        public ICollection<string> Receivers { get; set; }
        public string HtmlContent { get; set; }
        public string Subject { get; set; }
        public byte[] FileStream { get; set; }
    }
}
