using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SmogIt.Coordinator;
using SmogIt.Coordinator.Contracts;
using SmogIt.Core.Services;
using SmogIt.Models.DTO;

namespace SmogIt.API.Controllers.v1
{
    [Route("api/[controller]")]
    [ApiVersion(1.0)]
    [ApiController]
    public class ServiceController(IServiceCoordinator serviceCoordinator) : ControllerBase
    {

        [HttpGet()]
        public async Task<ActionResult<List<ServiceDetailsModel>>> GetAllAsync()
        {
            var data = await serviceCoordinator.GetAllAsync();
            return Ok(data);
        }
        [HttpPost]
        public async Task<ActionResult> CreateClientAsync([FromBody] ServiceModel service)
        {
            var id = await serviceCoordinator.AddAsync(service);
            return new ObjectResult(id) { StatusCode = 201 };
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateClientAsync(int id, [FromBody] ServiceModel service)
        {
            await serviceCoordinator.UpdateAsync(id, service);
            return NoContent();
        }
    }
}
