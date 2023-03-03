using System;

namespace ReadyLine.Models
{
    public class AdminRequest
    {
        public int Id { get; set; }
        public int RequesterUserId { get; set; }
        public int TargetUserId { get; set; }
        public int AdminRequestTypeId { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime CloseDateTime { get; set; }
        public bool IsCancelled { get; set; }
    }
}
