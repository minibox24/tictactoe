﻿namespace Tictactoe.Game;

public class Game
{
    public List<Session> Players { init; get; }

    public int Turn { get; private set; }

    public int[][] Map { init; get; }

    private DateTime StartTime { get; }

    public static event Func<Session, string, Task> EndEventReceived = (_, _) => Task.CompletedTask;
    public static event Func<Session, int, int[], Task> PlayEventReceived = (_, _, _) => Task.CompletedTask;
    public static event Func<Session, string, Task> EmoteEventReceived = (_, _) => Task.CompletedTask;

    public Game(List<Session> players)
    {
        Players = players;
        Turn = 0;
        Map = Enumerable.Range(0, 3).Select(_ => new[] { -1, -1, -1 }).ToArray();
        StartTime = DateTime.Now;
    }

    public bool IsMyTurn(Session session)
    {
        return Turn == Players.FindIndex(p => p.SessionId == session.SessionId);
    }

    public async Task<bool> Put(Session session, int index)
    {
        int y = index / 3, x = index % 3;

        if (Map[y][x] != -1)
        {
            return false;
        }

        Map[y][x] = Turn;
        Turn = Turn == 0 ? 1 : 0;

        await Play(session, index);

        return true;
    }

    public async Task Play(Session session, int index)
    {
        await PlayEventReceived(
            GetOppositePlayer(session),
            index,
            Map.SelectMany(a => a).ToArray());
    }

    public async Task CheckEnd()
    {
        if (CheckVertical(0) || CheckHorizontal(0) || CheckCross(0))
        {
            await EndEventReceived(Players[0], "WIN");
            await EndEventReceived(Players[1], "LOSE");

            GameManager.Games.Remove(this);
        }
        else if (CheckVertical(1) || CheckHorizontal(1) || CheckCross(1))
        {
            await EndEventReceived(Players[1], "WIN");
            await EndEventReceived(Players[0], "LOSE");

            GameManager.Games.Remove(this);
        }
        else if (!Map.Any(row => row.Any(col => col == -1)))
        {
            await EndEventReceived(Players[0], "DRAW");
            await EndEventReceived(Players[1], "DRAW");

            GameManager.Games.Remove(this);
        }

        bool CheckVertical(int player) => Enumerable.Range(0, 3).Any(y => Map[y].All(x => x == player));

        bool CheckHorizontal(int player) =>
            Enumerable.Range(0, 3).Any(x => Enumerable.Range(0, 3).All(y => Map[y][x] == player));

        bool CheckCross(int player) => (Map[0][0] == player && Map[1][1] == player && Map[2][2] == player) ||
                                       (Map[0][2] == player && Map[1][1] == player && Map[2][0] == player);
    }

    public async Task CheckIsAutoEnded()
    {
        if ((DateTime.Now - StartTime).TotalMinutes < 10)
        {
            return;
        }

        await EndEventReceived(Players[0], "DRAW");
        await EndEventReceived(Players[1], "DRAW");

        GameManager.Games.Remove(this);
    }

    public async Task LeaveGame(Session session)
    {
        await EndEventReceived(
            GetOppositePlayer(session), "LEAVE");

        GameManager.Games.Remove(this);
    }

    public async Task Emote(Session session, string emoji)
    {
        await EmoteEventReceived(
            GetOppositePlayer(session), emoji);
    }

    private Session GetOppositePlayer(Session session)
    {
        return Players.FindIndex(s => s.SessionId == session.SessionId) == 0 ? Players[1] : Players[0];
    }
}