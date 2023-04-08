namespace Domain
{
    public class Category : BaseEntity
    {
        public string Title { get; set; }
        public ICollection<Good> Goods { get; set; }
    }
}
