using Microsoft.EntityFrameworkCore;
using TechExam.Models;

namespace TechExam.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Users> Users{ get; set; }
    }
}
