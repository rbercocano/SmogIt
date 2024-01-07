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
    public class ClientController(IClientCoordinator clientCoordinator, NotificationService notificationService) : ControllerBase
    {
        private readonly IClientCoordinator clientCoordinator = clientCoordinator;

        [HttpGet("{pageSize:int}/{page:int}")]
        public async Task<ActionResult<PagedResult<ClientModel>>> GetClientsAsync(int pageSize, int page, [FromQuery] string? sortBy, [FromQuery] string? direction, [FromQuery] string? q)
        {
            var data = await clientCoordinator.GetClientsAsync(pageSize, page, sortBy, direction, q);
            return Ok(data);
        }

        [HttpGet("{id}")]
        public IActionResult GetclientById(int id)
        {
            // Implement your logic to retrieve a client by ID
            return Ok(new { Message = $"Get client with ID {id}" });
        }

        [HttpPost]
        public async Task<ActionResult> Createclient([FromBody] ClientModel client)
        {
            var id = await clientCoordinator.AddAsync(client);
            return new ObjectResult(id) { StatusCode = 201 };
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Updateclient(int id, [FromBody] ClientModel client)
        {
            await clientCoordinator.UpdateAsync(id, client);
            if (notificationService.HasNotifications())
                return BadRequest(notificationService.Notifications);
            return NoContent();
        }
    }
}
