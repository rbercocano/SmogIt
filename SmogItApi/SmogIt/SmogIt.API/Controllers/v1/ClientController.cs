using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SmogIt.Coordinator.Contracts;
using SmogIt.Core.Domains;
using SmogIt.Core.Services;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;

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
        public async Task<ActionResult<ClientDetailsModel>> GetClientByIdAsync(int id)
        {
            var data = await clientCoordinator.FindAsync(id);
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult> CreateClientAsync([FromBody] ClientModel client)
        {
            var id = await clientCoordinator.AddAsync(client);
            return new ObjectResult(id) { StatusCode = 201 };
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateClientAsync(int id, [FromBody] ClientModel client)
        {
            await clientCoordinator.UpdateAsync(id, client);
            if (notificationService.HasNotifications())
                return BadRequest(notificationService.Notifications);
            return NoContent();
        }


        [HttpPost("Vehicle")]
        public async Task<ActionResult> AddVehicle([FromBody] VehicleModel client)
        {
            var id = await clientCoordinator.AddVehicleAsync(client);
            return new ObjectResult(id) { StatusCode = 201 };
        }

        [HttpGet("{clientId}/Vehicles/{pageSize:int}/{page:int}")]
        public async Task<ActionResult<ClientDetailsModel>> GetVehiclesByClientIdAsync(int clientId, int pageSize, int page, [FromQuery] string? sortBy, [FromQuery] string? direction, [FromQuery] string? q)
        {
            switch (sortBy)
            {
                case "make":
                    sortBy = "vehicleMake";break;
                case "model":
                    sortBy = "vehicleModel"; break;
                default:
                    break;
            }
            var data = await clientCoordinator.GeVehiclestByClientAsync(clientId, pageSize, page, sortBy, direction, q);
            return Ok(data);
        }
    }
}
