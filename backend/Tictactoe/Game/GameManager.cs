namespace Tictactoe.Game;

public class GameManager
{
    private static Queue<(Session session, DateTime enqueTime)> _gameQueue = new();

    public static readonly List<Game> Games = new();

    public static event Func<Session, string, bool, Game, bool, Task> StartEventReceived =
        (_, _, _, _, _) => Task.CompletedTask;

    public static event Func<Task> PingEventReceived = () => Task.CompletedTask;

    static GameManager()
    {
        Task.Run(SendPingEvent);
        Task.Run(CheckDelayedQueue);
    }

    private static async Task SendPingEvent()
    {
        while (true)
        {
            Thread.Sleep(1000 * 10);

            await PingEventReceived();
        }
    }

    private static async Task CheckDelayedQueue()
    {
        while (true)
        {
            Thread.Sleep(1000 * 5);

            if (_gameQueue.Count != 1 || (DateTime.Now - _gameQueue.First().enqueTime).TotalSeconds < 30)
            {
                continue;
            }

            var session = _gameQueue.Dequeue().session;
            Game game = new(new List<Session> { session });
            Games.Add(game);

            await StartEventReceived(session, Nickname.Generate(), true, game, true);
        }
    }

    public static void Enqueue(Session session)
    {
        _gameQueue.Enqueue((session, DateTime.Now));
    }

    public static async Task CreateNewGameIfAvailable()
    {
        if (_gameQueue.Count < 2)
        {
            return;
        }

        var sessions = MakePair();
        Game game = new(sessions);
        Games.Add(game);

        await StartEventReceived(sessions[0], sessions[1].NickName, true, game, false);
        await StartEventReceived(sessions[1], sessions[0].NickName, false, game, false);

        TotalPlayCountController.AddPlayCount();
    }

    public static List<Session> MakePair()
    {
        return new List<Session> { _gameQueue.Dequeue().session, _gameQueue.Dequeue().session };
    }

    public static void RemoveFromQueue(Session session)
    {
        _gameQueue = new Queue<(Session, DateTime)>(_gameQueue.Where(q => q.session.SessionId != session.SessionId));
    }

    public static int GetPlayingGameCount()
    {
        FilterEndedGames();

        return Games.Count;
    }

    public static void FilterEndedGames()
    {
        Games.ToList().ForEach(x => x.CheckIsAutoEnded().Wait());
    }
}