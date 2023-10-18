using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TechExam.Data;
using TechExam.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Microsoft.OpenApi.Models;

namespace TechExam
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Tech Exam Swagger APIs",
                    Version = "v1",
                    Description = "Api collection for the application",
                });
            });

            services.AddControllers();

            services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReadCommentHandling = JsonCommentHandling.Skip;
            });

            services.AddScoped<ITextService, TextService>();

            // Add CORS services
            services.AddCors();

            // Add custom services
            services.AddScoped<ITextEncoder, TextEncoder>();

            // Add the database context with the connection string
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tech Exam Swagger APIs");
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            // Use CORS middleware
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                // Add the custom route for the UpdateUserData action
                endpoints.MapControllerRoute(
                    name: "updateUserData",
                    pattern: "api/text/updateUserData/{userName}",
                    defaults: new { controller = "text", action = "UpdateUserData" }
                );

                endpoints.MapControllerRoute(
                    name: "updateCurrentUserBalance",
                    pattern: "api/text/updateCurrentUserBalance/{currentUser}",
                    defaults: new { controller = "text", action = "updateCurrentUserBalance" }
                );

                endpoints.MapControllerRoute(
                name: "withdrawCurrentUserBalance",
                pattern: "api/text/withdrawCurrentUserBalance/{currentUser}",
                defaults: new { controller = "text", action = "withdrawCurrentUserBalance" }
                );
            });
        }
    }
}
