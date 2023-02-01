namespace ReadyLine.Models
{
    public class UserType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static int EMPLOYEE_ID => 1;
        public static int ADMIN_ID => 2;

    }
}
