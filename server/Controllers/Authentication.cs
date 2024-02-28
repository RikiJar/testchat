using Microsoft.AspNetCore.Mvc;
using server.models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class Authentication : ControllerBase {
    private readonly ILogger<ChatMessageController> _logger;
    private readonly YourDbContext _dbContext;

    public Authentication(ILogger<ChatMessageController> logger, YourDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpPost(Name = "Authenticate")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Post()
    {
        

        return Ok("Authenticated");
    }
}