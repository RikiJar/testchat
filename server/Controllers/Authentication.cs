using System.ComponentModel;
using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.helpers;
using server.models;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class Authentication : ControllerBase {
    private readonly ILogger<ChatMessageController> _logger;
    private readonly YourDbContext _dbContext;
    private readonly JwtService _jwtService;
    public Authentication(ILogger<ChatMessageController> logger, YourDbContext dbContext, JwtService jwtService)
    {
        _logger = logger;
        _dbContext = dbContext;
        _jwtService = jwtService;
    }

    [Route("api/[controller]/authenticate")]
    [HttpPost(Name = "Authenticate")]
    public IActionResult Post([FromBody] users u)
    {
        var userName = _dbContext.users.FirstOrDefault(user => user.name == u.name);
        if (userName == null) {
            return NotFound("user not found");
        }
        if (userName.password != u.password) {
            return BadRequest("Invalid password");
        }

        var token = _jwtService.Generate(userName.id);

        Response.Cookies.Append("jwt", token, new CookieOptions
        {
            HttpOnly = true
        });

        return Ok(new { message = "success" });
    }

    [Route("api/[controller]/login")]
    [HttpGet(Name = "User")]
    public IActionResult GetUser(){
        var jwt = Request.Cookies["jwt"];
        if (jwt == null) {
            return Unauthorized();
        }
        var token = _jwtService.Verify(jwt);
        if (token == null) {
            return Unauthorized();
        }
        var userId = int.Parse(token.Issuer);
        var user = _dbContext.users.FirstOrDefault(user => user.id == userId);
        return Ok(user);
    }
}