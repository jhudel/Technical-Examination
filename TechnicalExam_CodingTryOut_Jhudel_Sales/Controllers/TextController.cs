using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Text;
using System.Threading.Tasks;
using TechExam.Data;
using TechExam.Models;
using TechExam.Services;

namespace TechExam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextController : ControllerBase
    {

        private readonly ITextService _textService;

        public TextController(ITextService textService)
        {
            _textService = textService;
        }


        [HttpPost("registerUser")]
        public async Task<IActionResult> registerUserAsync([FromBody] Users userData)
        {
            if (userData == null)
            {
                return BadRequest("textData is null");
            }

            await _textService.RegisterUser(userData);

            var SuccessMessage = new successMessage()
            {
                SuccessMessage = "User successfully registered",
                SuccessSubMessage = "You can now log in"
            };

            return Ok(new { successMessage = SuccessMessage });
        }

        //-----------------------------------------

        [HttpGet("GetListOfEmployees")]
        public async Task<IActionResult> getListOfEmployees()
        {
            var userName = "";
            var output = await _textService.getListOfEmployees(userName);

            return Ok(new { userBalance = output });
        }

        [HttpPost("EditEmployees")]
        public async Task<IActionResult> EditEmployees([FromBody] Employees userData)
        {
            var result = await _textService.EditEmployees(userData);
            return Ok(new { successMessage = result });
        }

        [HttpPut("DeleteEmployee")]
        public async Task<IActionResult> DeleteEmployee([FromQuery] int EmployeeId)
        {
            var result = await _textService.DeleteEmployee(EmployeeId);
            return Ok(new { message = "depositted successfully" });
        }

    }
}
