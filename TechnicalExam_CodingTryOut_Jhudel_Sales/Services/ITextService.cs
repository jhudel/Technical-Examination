using TechExam.Models;
using static TechExam.Services.TextService;

namespace TechExam.Services
{
    public interface ITextService
    {
       
        Task RegisterUser(Users userData);

        //---------------
        Task<object> getListOfEmployees(string userName);
        Task<object> EditEmployees(Employees userData);

        Task<object> DeleteEmployee(int EmployeeId);
    }
}
