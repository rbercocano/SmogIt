using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SmogIt.Coordinator.Contracts;
using SmogIt.Core.Services;
using SmogIt.Models.DTO;

namespace SmogIt.API.Controllers.v1
{
    [Route("api/[controller]")]
    [ApiVersion(1.0)]
    [ApiController]
    public class VehicleController(IVehicleCoordinator vehicleCoordinator, NotificationService notificationService) : ControllerBase
    {

        [HttpGet("Makes")]
        public async Task<ActionResult<List<VehicleMakeModel>>> GetAllMakesAsync()
        {
            var data = await vehicleCoordinator.GetAllMakesAsync();
            return Ok(data);
        }
        [HttpGet("Makes/{name}")]
        public async Task<ActionResult<List<VehicleMakeModel>>> GetAllMakesByNameAsync(string name)
        {
            var data = await vehicleCoordinator.GetAllMakesByNameAsync(name);
            return Ok(data);
        }
        [HttpGet("Makes/{makeId:int}/Models")]
        public async Task<ActionResult<List<VehicleModelModel>>> GetAllModelsByMakeAsync(short makeId)
        {
            var data = await vehicleCoordinator.GetAllModelsByMakeAsync(makeId);
            return Ok(data);
        }
        [HttpGet("Makes/{makeId:int}/Models/{name}")]
        public async Task<ActionResult<List<VehicleModelModel>>> GetAllModelsByMakeAsync(short makeId, string name)
        {
            var data = await vehicleCoordinator.GetAllModelsByMakeAsync(makeId, name);
            return Ok(data);
        }
    }
}
