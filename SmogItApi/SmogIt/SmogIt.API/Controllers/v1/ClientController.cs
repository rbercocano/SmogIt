using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SmogIt.Coordinator.Contracts;
using SmogIt.Models.Core;
using SmogIt.Models.DTO;

namespace SmogIt.API.Controllers.v1
{
    [Route("api/[controller]")]
    [ApiVersion(1.0)]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientCoordinator clientCoordinator;

        public ClientController(IClientCoordinator clientCoordinator)
        {
            this.clientCoordinator = clientCoordinator;
        }
        [HttpGet("{pageSize:int}/{page:int}")]
        public async Task<ActionResult<PagedResult<ClientModel>>> GetclientsAsync(int pageSize, int page, [FromQuery] string? sortBy, [FromQuery] string? direction, [FromQuery] string? q)
        {
            var data = await clientCoordinator.GetclientsAsync(pageSize, page, sortBy, direction, q);
            return Ok(data);
        }

        [HttpGet("{id}")]
        public IActionResult GetclientById(int id)
        {
            // Implement your logic to retrieve a client by ID
            return Ok(new { Message = $"Get client with ID {id}" });
        }

        [HttpPost]
        public IActionResult Createclient([FromBody] ClientModel client)
        {
            // Implement your logic to create a new client
            return Ok(new { Message = "client created successfully" });
        }

        [HttpPut("{id}")]
        public IActionResult Updateclient(int id, [FromBody] ClientModel client)
        {
            // Implement your logic to update a client by ID
            return Ok(new { Message = $"client with ID {id} updated successfully" });
        }
    }
}
