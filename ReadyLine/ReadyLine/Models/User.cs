using System;

namespace ReadyLine.Models
{
    public class User
    {
        public int Id { get; set; }

        public string FirebaseUserId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImgUrl { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime HireDate { get; set; }
        public string JobTitle { get; set; }
        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }
    }
}
