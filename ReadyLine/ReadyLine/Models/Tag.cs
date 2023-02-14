using System.ComponentModel.DataAnnotations;

namespace ReadyLine.Models
{
    public class Tag
    {
        public int Id { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
