﻿using System.Net.WebSockets;
using Newtonsoft.Json;
using Tictactoe.Utils;
using static Tictactoe.Game.JsonClasses;

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
            if (!TryDeserializeJsonObject<CoreMessage>(str, out var data))
            {
                await SendError("INCORRECT_FORMAT");

                return;
            }

            await HandleEvent(data!, str);

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
        if (data.type is null)
        {
            await SendError("INCORRECT_FORMAT");

            return;
        }

        switch (data.type.Trim())
        {
            case "QUEUE":
                await AddQueue();

                break;

            case "UNQUEUE":
                await LeaveQueue();

                break;
            case "PUT":
                if (!TryDeserializeJsonObject<PutMessage>(rawStr, out var putData))
                {
                    await SendError("INCORRECT_FORMAT");

                    return;
                }

                await Put(putData!);

                break;
            default:
                await SendError("INCORRECT_FORMAT");

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

    private async Task LeaveQueue()
    {
        if (State != SessionState.Queue)
        {
            await SendError("NOT_IN_QUEUE");

            return;
        }

        GameManager.RemoveFromQueue(_session);
        State = SessionState.Idle;
    }

    private async Task OnStartEventReceived(Session session, string vs, bool isFirst, Game game)
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

        if (msg.index is > 8 or < 0)
        {
            await SendError("INCORRECT_FORMAT");

            return;
        }

        if (!await _game!.Put(_session, msg.index))
        {
            await SendError("ALREADY_CHECKED");

            return;
        }

        _game.CheckEnd();
    }

    private async Task OnOnPlayEventReceived(Session session, int index, int[] board)
    {
        if (session.SessionId != _session.SessionId)
        {
            return;
        }

        await WebSocket.SendStringAsync(JsonConvert.SerializeObject(new PlayMessage
            { index = index, board = board }));
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

    private static bool TryDeserializeJsonObject<T>(string str, out T? obj)
    {
        obj = default;

        try
        {
            obj = JsonConvert.DeserializeObject<T>(str)!;

            return true;
        }
        catch
        {
            return false;
        }
    }
}