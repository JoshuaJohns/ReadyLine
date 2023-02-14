using System.ComponentModel.DataAnnotations;

namespace ReadyLine.Models
{
    public class VehicleType
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
