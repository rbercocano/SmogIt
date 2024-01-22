using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SmogIt.Coordinator;
using SmogIt.Coordinator.Contracts;
using SmogIt.Models.DTO;
using System.Net;

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
        [HttpDelete("Service/{appointmentServiceId:int}")]
        public async Task<ActionResult> RemoveServiceAsync(int appointmentServiceId)
        {
            await appointmentCoordinator.RemoveServiceAsync(appointmentServiceId);
            return Ok();
        }
        [HttpPost("{appointmentId:int}/Service")]
        public async Task<ActionResult<int>> AddServiceAsync(int appointmentId, AppointmentServiceModel model)
        {
            var id = await appointmentCoordinator.AddServiceAsync(appointmentId, model);
            return Ok(id);
        }
        [HttpGet("Queue")]
        public async Task<ActionResult<AppointmentDetailsModel>> GetNotCompleted()
        {
            var data = await appointmentCoordinator.GetNotCompleted();
            return Ok(data);
        }
        
    }
}
