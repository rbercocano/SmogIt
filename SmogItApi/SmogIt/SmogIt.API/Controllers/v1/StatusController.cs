using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SmogIt.Coordinator.Contracts;
using SmogIt.Models.DTO;

namespace SmogIt.API.Controllers.v1
{
    [Route("api/[controller]")]
    [ApiVersion(1.0)]
    [ApiController]
    public class StatusController(IStatusCoordinator statusCoordinator) : ControllerBase
    {

        [HttpGet()]
        public async Task<ActionResult<List<StatusModel>>> GetAllAsync()
        {
            var data = await statusCoordinator.GetAllAsync();
            return Ok(data);
        }
    }
}
