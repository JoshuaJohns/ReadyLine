using System.ComponentModel.DataAnnotations;

namespace ReadyLine.Models
{
    public class ReportTag
    {
        public int Id { get; set; }
        [Required]
        public int ReportId { get; set; }
        [Required]
        public int TagId { get; set; }


    }
}
