namespace Domain
{
    public class ProcurementItem : BaseEntity
    {
        public string Title { get; set; }      
        public int CategoryId { get; set; }  
        public Category Category { get; set; }
    }
}
