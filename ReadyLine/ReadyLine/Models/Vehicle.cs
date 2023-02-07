using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReadyLine.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

        [Required]
        public int VehicleTypeId { get; set; }

        [Required]
        public int MileageAtPMService { get; set; }
        public string ImageLocation { get; set; }


        public int CurrentMileage { get; set; }

        [Required]
        public string VehicleNumber { get; set; }

        public bool IsApproved { get; set; }


        public bool IsClaimed { get; set; }


        public bool IsInShop { get; set; }




        public VehicleType VehicleType { get; set; }
        public List<Report> Reports { get; set; }






    }
}
