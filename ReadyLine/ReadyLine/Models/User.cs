using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReadyLine.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string FirebaseUserId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
     
        public string ImageUrl { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime? HireDate { get; set; }
        
        public string JobTitle { get; set; }
        
        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }
        public List<Vehicle> Vehicles { get; set; }
    }
}
