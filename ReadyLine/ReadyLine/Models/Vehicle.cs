using System.ComponentModel.DataAnnotations;

namespace ReadyLine.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

        [Required]
        public int vehicleTypeId { get; set; }

        [Required]
        public int MilageAtPMService { get; set; }


        public int CurrentMilage { get; set; }

        [Required]
        public string VehicleNumber { get; set; }

        public bool IsApproved { get; set; }


        public bool IsClaimed { get; set; }


        public bool IsInShop { get; set; }











    }
}
