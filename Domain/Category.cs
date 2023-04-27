namespace Domain
{
    public class Category : BaseEntity
    {
        public string Title { get; set; }
        public CategoryType Type { get; set; }
        public ICollection<ProcurementItem> ProcurementItems { get; set; }
    }
}
