using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SmogIt.Coordinator.Contracts;
using SmogIt.Core.Domains;
using SmogIt.Core.Services;
using SmogIt.Models.DTO;

namespace SmogIt.API.Controllers.v1
{
    [Route("api/[controller]")]
    [ApiVersion(1.0)]
    [ApiController]
    public class UserController(IUserCoordinator userCoordinator, NotificationService notificationService) : ControllerBase
    {

        [HttpGet("{pageSize:int}/{page:int}")]
        public async Task<ActionResult<PagedResult<UserModel>>> GetUsersAsync(int pageSize, int page, [FromQuery] string? sortBy, [FromQuery] string? direction, [FromQuery] string? q)
        {
            var data = await userCoordinator.SearchAsync(pageSize, page, sortBy, direction, q);
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDetailsModel>> FindAsync(int id)
        {
            var data = await userCoordinator.FindAsync(id);
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] UserModel User)
        {
            var id = await userCoordinator.AddAsync(User);
            return new ObjectResult(id) { StatusCode = 201 };
        }
        [HttpPost("Authenticate")]
        public async Task<ActionResult> LoginAsync([FromBody] LoginModel user)
        {
            var id = await userCoordinator.FindAsync(user.Login, user.Password);
            if (notificationService.HasNotifications())
                return BadRequest(notificationService.Notifications);

            return new ObjectResult(id) { StatusCode = 201 };
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] UpdateUserModel User)
        {
            await userCoordinator.UpdateAsync(id, User);
            if (notificationService.HasNotifications())
                return BadRequest(notificationService.Notifications);
            return NoContent();
        }

    }
}
