using Microsoft.AspNetCore.Mvc;
using Tictactoe.Game;

namespace Tictactoe.Controllers;

[ApiController]
public class GameController : ControllerBase
{
    [Route("ws")]
    public async Task Get()
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            await new GameSession(webSocket, HttpContext.Session.Id).Start();
        }
        else
        {
            HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }
}