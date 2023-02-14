using System.ComponentModel.DataAnnotations;

namespace ReadyLine.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Stage { get; set; }
    }
}
