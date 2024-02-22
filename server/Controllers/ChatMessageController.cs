using Microsoft.AspNetCore.Mvc;
using server.models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]

public class ChatMessageController : ControllerBase {
    private readonly ILogger<ChatMessageController> _logger;
    private readonly YourDbContext _dbContext;

    public ChatMessageController(ILogger<ChatMessageController> logger, YourDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpGet(Name = "GetChatMessages")]
    public IActionResult Get()
    {
        List <messages>? m = _dbContext.messages.ToList();
        
        return Ok(m);
    }
}