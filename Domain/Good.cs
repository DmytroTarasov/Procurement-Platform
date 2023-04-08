namespace Domain
{
    public class Good : BaseEntity
    {
        public string Title { get; set; }      
        public int CategoryId { get; set; }  
        public Category Category { get; set; }
    }
}
