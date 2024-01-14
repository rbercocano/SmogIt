using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SmogIt.Coordinator.Contracts;
using SmogIt.Models.DTO;

namespace SmogIt.API.Controllers.v1
{
    [Route("api/[controller]")]
    [ApiVersion(1.0)]
    [ApiController]
    public class ServiceController(IServiceCoordinator serviceCoordinator) : ControllerBase
    {

        [HttpGet()]
        public async Task<ActionResult<List<ServiceModel>>> GetAllAsync()
        {
            var data = await serviceCoordinator.GetAllAsync();
            return Ok(data);
        }
    }
}
