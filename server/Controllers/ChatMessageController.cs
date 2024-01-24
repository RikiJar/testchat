using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]

public class ChatMessageController : ControllerBase {
    private readonly ILogger<ChatMessageController> _logger;

    public ChatMessageController(ILogger<ChatMessageController> logger)
    {
        _logger = logger;
    }

    List<string> randomNames = new List<string>
    {
        "Alice", "Bob", "Charlie", "David", "Eva", "Frank",
        "Grace", "Henry", "Ivy", "Jack", "Katie", "Liam",
        "Mia", "Nathan", "Olivia", "Paul", "Quinn", "Rachel",
        "Samuel", "Taylor", "Ursula", "Victor", "Wendy", "Xander",
        "Yasmine", "Zachary"
    };

    [HttpGet(Name = "GetChatMessages")]
    public IEnumerable<ChatMessage> Get()
    {
        return Enumerable.Range(1, 20).Select(index => new ChatMessage
        {
            UserId = randomNames[new Random().Next(0, randomNames.Count)],
            Message = $"Message {index}"
        })
        .ToArray();
    }
}