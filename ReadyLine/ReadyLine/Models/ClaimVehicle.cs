using System;
using System.ComponentModel.DataAnnotations;

namespace ReadyLine.Models
{
    public class ClaimVehicle
    {
        public int Id { get; set; }

        [Required]
        public int VehicleId { get; set; }

        [Required]
        public int  UserId { get; set;}
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
