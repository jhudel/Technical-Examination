using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace TechExam.Models
{
    public class Users
    {
        [Key]
        public int EmployeeId { get; set; }
        [Required]
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public int Tin { get; set; }

        public string EmployeeType { get; set; }
    }

    public class errorMessage
    {
        public string? ErrorMessage { get; set; }
        public string? ErrorSubMessage { get; set; }
    }

    public class successMessage
    {
        public string? SuccessMessage { get; set; }
        public string? SuccessSubMessage { get; set; }
    }

    public class Employees
    {
        [Key]
        public int EmployeeId { get; set; }
        [Required]
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public int Tin { get; set; }

        public string EmployeeType { get; set; }
    }
}
