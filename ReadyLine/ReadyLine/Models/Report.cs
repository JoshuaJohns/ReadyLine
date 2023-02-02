using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReadyLine.Models
{
    public class Report
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        [Required]
        public int VehicleId { get; set; }
        [Required]
        public string Issue { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime? DateCompleted { get; set; }

        public User User { get; set; }
        public Category Category { get; set; }
        public Vehicle Vehicle { get; set; }
        public List<Tag> Tags { get; set; }

    }
}
