using System.Net.WebSockets;
using Newtonsoft.Json;
using Tictactoe.Utils;
using static Tictactoe.Game.MessageClasses;

namespace Tictactoe.Game;

public class GameSession
{
    public enum SessionState
    {
        Idle,
        Queue,
        Game
    }

    public SessionState State;

    public WebSocket WebSocket { init; get; }

    private readonly Session _session;

    public string Nickname { init; get; }

    private Game? _game;

    public GameSession(WebSocket webSocket, string sessionId)
    {
        WebSocket = webSocket;

        Nickname = Tictactoe.Game.Nickname.Generate();

        _session = new Session(sessionId, Nickname);
    }

    public async Task Start()
    {
        await WebSocket.SendStringAsync(JsonConvert.SerializeObject(new LoginMessage { nick = Nickname }));

        State = SessionState.Idle;

        GameManager.OnStartEventReceived += OnStartEventReceived;
        Game.OnPlayEventReceived += OnOnPlayEventReceived;
        Game.OnEndEventReceived += OnEndEventReceived;

        var (str, receiveResult) = await WebSocket.ReceiveStringAsync();

        while (!receiveResult.CloseStatus.HasValue)
        {
            var data = JsonConvert.DeserializeObject<CoreMessage>(str)!;
            await HandleEvent(data, str);

            (str, receiveResult) = await WebSocket.ReceiveStringAsync();
        }

        await WebSocket.CloseAsync(receiveResult);

        if (State == SessionState.Queue)
        {
            GameManager.RemoveFromQueue(_session);
        }

        if (State == SessionState.Game)
        {
            await _game!.LeaveGame(_session);
        }
    }

    private async Task HandleEvent(CoreMessage data, string rawStr)
    {
        switch (data.type.Trim())
        {
            case "QUEUE":
                await AddQueue();

                break;
            case "PUT":
                await Put(JsonConvert.DeserializeObject<PutMessage>(rawStr)!);

                break;
        }
    }

    private async Task AddQueue()
    {
        if (State == SessionState.Queue)
        {
            await SendError("ALREADY_QUEUED");

            return;
        }

        if (State == SessionState.Game)
        {
            await SendError("ALREADY_PLAYING");

            return;
        }

        GameManager.Enqueue(_session);
        State = SessionState.Queue;

        await GameManager.CreateNewGameIfAvailable();
    }

    private async Task OnStartEventReceived(Session session, string vs, bool isFirst, Tictactoe.Game.Game game)
    {
        if (session.SessionId != _session.SessionId)
        {
            return;
        }

        _game = game;

        await WebSocket.SendStringAsync(
            JsonConvert.SerializeObject(new StartMessage { vs = vs, first = isFirst }));

        State = SessionState.Game;
    }

    private async Task Put(PutMessage msg)
    {
        if (State != SessionState.Game)
        {
            await SendError("NOT_PLAYING");

            return;
        }

        if (!_game!.IsMyTurn(_session))
        {
            await SendError("NOT_YOUR_TURN");

            return;
        }

        if (!await _game!.Put(_session, msg.index))
        {
            await SendError("ALREADY_CHECKED");

            return;
        }

        _game.CheckEnd();
    }

    private async Task OnOnPlayEventReceived(Session session, int index)
    {
        if (session.SessionId != _session.SessionId)
        {
            return;
        }

        await WebSocket.SendStringAsync(JsonConvert.SerializeObject(new PlayMessage
            { index = index }));
    }

    private async Task OnEndEventReceived(Session session, string endType)
    {
        if (session.SessionId != _session.SessionId)
        {
            return;
        }

        await WebSocket.SendStringAsync(JsonConvert.SerializeObject(new EndMessage
            { status = endType }));

        State = SessionState.Idle;
    }

    private async Task SendError(string errorMessage)
    {
        await WebSocket.SendStringAsync(JsonConvert.SerializeObject(new ErrorMessage
            { error = errorMessage }));
    }
}