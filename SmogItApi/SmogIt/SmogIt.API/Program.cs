using Asp.Versioning;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using SmogIt.Coordinator;
using SmogIt.Coordinator.Contracts;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Data.Repositories;
using SmogIt.Models.Core;
using SmogIt.Models.Profiles;
using SmogIt.Services;
using SmogIt.Services.Contracts;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Configuration.AddJsonFile("appsettings.json");
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddDbContext<SmogItContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    // Enable logging
    options.EnableSensitiveDataLogging();
    // Configure logging
    options.LogTo(Console.WriteLine, LogLevel.Information);
});

builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddScoped<IAppointmentServiceRepository, AppointmentServiceRepository>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<IStatusRepository, StatusRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
builder.Services.AddScoped<IClientService, ClientService>();

builder.Services.AddScoped<IClientCoordinator, ClientCoordinator>();

builder.Services.AddScoped<NotificationService>();

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    options.ApiVersionReader = new QueryStringApiVersionReader("api-version");
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SmogIt API");
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseExceptionHandler("/error");

app.MapControllers();

app.Run();
