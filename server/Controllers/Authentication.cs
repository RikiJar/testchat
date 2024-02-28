using System.ComponentModel;
using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.models;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class Authentication : ControllerBase {
    private readonly ILogger<ChatMessageController> _logger;
    private readonly YourDbContext _dbContext;

    public Authentication(ILogger<ChatMessageController> logger, YourDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpPost(Name = "Authenticate")]
    public IActionResult Post()
    {
        users? user =_dbContext.users.FirstOrDefault();
        if (user == null) {
            return BadRequest("No user found");
        }
        // save the authentication to the session
        HttpContext.Session.SetString("user", user.name ?? throw new Exception("User not found"));
        return Ok();
    }
}