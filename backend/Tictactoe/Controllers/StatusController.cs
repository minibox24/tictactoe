using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Tictactoe.Game;

namespace Tictactoe.Controllers;

[Route("status")]
[ApiController]
public class StatusController : ControllerBase
{
    [HttpGet]
    public string Get()
    {
        return JsonConvert.SerializeObject(new Status
            { now = GameManager.Games.Count, total = TotalPlayCountController.TotalPlayCount });
    }

    public class Status
    {
        public int now;
        public int total;
    }
}