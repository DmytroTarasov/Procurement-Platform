namespace Domain
{
    public class Category : BaseEntity
    {
        public string Title { get; set; }
        public ICollection<ProcurementItem> ProcurementItems { get; set; }
    }
}
