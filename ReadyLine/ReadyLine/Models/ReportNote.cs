using System;

namespace ReadyLine.Models
{
    public class ReportNote
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int ReportId { get; set; }
        public DateTime CreateDateTime { get; set; }
        public string Content { get; set; }
        public User User { get; set; }

    }
}
