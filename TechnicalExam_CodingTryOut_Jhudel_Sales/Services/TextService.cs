using TechExam.Data;
using TechExam.Models;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Text;
using System.Threading.Tasks;

using BCrypt.Net;

namespace TechExam.Services
{

    public class TextService : ITextService
    {

        private readonly ApplicationDbContext _db;

        public TextService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task RegisterUser(Users userData)
        {
            if (userData == null)
            {
                return;
            }

            var userRequest = new Users()
            {
                FullName = userData.FullName,
                BirthDate = userData.BirthDate,
                Tin = userData.Tin,
                EmployeeType = userData.EmployeeType
            };

            _db.Users.Add(userRequest);
            await _db.SaveChangesAsync();

        }

        //-------------------------------
        public async Task<object> getListOfEmployees(string userName)
        {
            try
            {
                var result = await _db.Users.ToListAsync();

                if (result == null)
                {
                    return null;
                }

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in getListOfEmployees: " + ex.Message);
                return null;
            }
        }

        public async Task<object> EditEmployees(Employees userData)
        {
            if (userData == null)
            {
                return null;
            }

            var user = _db.Users.FirstOrDefault(u => u.EmployeeId == userData.EmployeeId);
            user.FullName = userData.FullName;
            user.BirthDate = userData.BirthDate;
            user.Tin = userData.Tin;
            user.EmployeeType = userData.EmployeeType;
            
            await _db.SaveChangesAsync();
            var successMessage = new successMessage()
            {
                SuccessMessage = $"created successfully",
            };
            return successMessage;
        }

        public async Task<object> DeleteEmployee(int EmployeeId)
        {
            var result = _db.Users.FirstOrDefault(u => u.EmployeeId == EmployeeId);
            _db.Users.Remove(result);

            await _db.SaveChangesAsync();

            var successMessage = new successMessage()
            {
                SuccessMessage = $"deleted successfully",
            };
            return successMessage;
        }

    }
}
