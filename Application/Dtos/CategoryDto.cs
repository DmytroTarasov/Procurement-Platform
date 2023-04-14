namespace Application.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<GoodDto> Goods { get; set; }
    }
}