using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SmogIt.Coordinator;
using SmogIt.Coordinator.Contracts;
using SmogIt.Models.DTO;

namespace SmogIt.API.Controllers.v1
{
    [Route("api/[controller]")]
    [ApiVersion(1.0)]
    [ApiController]
    public class AppointmentController(IAppointmentCoordinator appointmentCoordinator) : ControllerBase
    {

        [HttpGet("{pageSize:int}/{page:int}")]
        public async Task<ActionResult<AppointmentDetailsModel>> SearchAsync(int pageSize, int page, [FromQuery] string? sortBy, [FromQuery] string? direction, [FromQuery] string? q)
        {
            var data = await appointmentCoordinator.SearchAsync(pageSize, page, sortBy, direction, q);
            return Ok(data);
        }
    }
}
