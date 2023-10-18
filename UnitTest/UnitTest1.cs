using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newtonsoft.Json;
using System.Threading.Tasks;
using TechExam.Controllers;
using TechExam.Data;
using TechExam.Models;
using TechExam.Services;
using Effort;
using System.Data.Common;

namespace TechExam.Tests.Controllers
{
    [TestClass]
    public class TextControllerTests
    {
        [TestMethod]
        public async Task EncodeTextAsync_ValidData_ReturnsOkResult()
        {
            // Arrange
            var mockTextService = new Mock<ITextService>();
            var controller = new TextController(mockTextService.Object);

            var userData = new Users
            {
                FullName = "Test",
                BirthDate = new DateTime(2023, 10, 20),
                Tin = 12,
                EmployeeType = "Regular"

            };

            // Act
            var result = await controller.registerUserAsync(userData) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }

        [TestMethod]
        public async Task EditEmployees_ReturnsOkResult()
        {
            // Arrange
            var userData = new Employees
            {
                EmployeeId = 1, 
                FullName = "UpdatedName",
                BirthDate = new DateTime(2023, 10, 20),
                Tin = 12,
                EmployeeType = "Regular"
            };

            var mockTextService = new Mock<ITextService>();
            var mockDbContext = new Mock<ApplicationDbContext>(); 

            mockTextService.Setup(s => s.EditEmployees(It.IsAny<Employees>()))
                .ReturnsAsync(new successMessage
                {
                    SuccessMessage = "created successfully"
                });

            var controller = new TextController(mockTextService.Object);
            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };

            // Act
            var result = await controller.EditEmployees(userData) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);

            mockTextService.Verify(s => s.EditEmployees(It.IsAny<Employees>()), Times.Once);
            mockDbContext.Setup(db => db.SaveChangesAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(1); 
        }

        [TestMethod]
        public async Task GetListOfEmployees_ReturnsOkResult()
        {
            // Arrange
            var mockTextService = new Mock<ITextService>();
            var controller = new TextController(mockTextService.Object);

            var userData = new List<Users>
            {
                new Users
                {
                    EmployeeId = 1,
                    FullName = "Test User 1",
                    BirthDate = new DateTime(2000, 1, 1),
                    Tin = 12345,
                    EmployeeType = "Regular"
                },
            };

            mockTextService.Setup(s => s.getListOfEmployees(It.IsAny<string>()))
                .ReturnsAsync(userData);

            // Act
            var result = await controller.getListOfEmployees() as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);

            var responseData = result.Value as IEnumerable<Users>;

            Assert.IsNotNull(responseData);
            
        }



        [TestMethod]
        public async Task DeleteEmployee_ReturnsOkResult()
        {
            // Arrange
            var employeeId = 1; 
            var mockTextService = new Mock<ITextService>();
            var mockDbContext = new Mock<ApplicationDbContext>();

            mockDbContext.Setup(db => db.SaveChangesAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(1); 

            var controller = new TextController(mockTextService.Object);
            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };

            // Act
            var result = await controller.DeleteEmployee(employeeId) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);

            mockTextService.Verify(s => s.DeleteEmployee(employeeId), Times.Once);

            Console.WriteLine("SaveChangesAsync invoked: " + mockDbContext.Invocations.Any(i => i.Method.Name == "SaveChangesAsync"));

            mockDbContext.Setup(db => db.SaveChangesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(1);
        }

    }
}
