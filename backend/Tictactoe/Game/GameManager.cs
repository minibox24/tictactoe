namespace Tictactoe.Game;

public class GameManager
{
    private static Queue<Session> _gameQueue = new();

    public static readonly List<Game> Games = new();

    public static event Func<Session, string, bool, Game, Task> StartEventReceived =
        (_, _, _, _) => Task.CompletedTask;

    public static event Func<Task> PingEventReceived = () => Task.CompletedTask;

    static GameManager()
    {
        Task.Run(async () =>
        {
            while (true)
            {
                Thread.Sleep(1000 * 10);

                await PingEventReceived();
            }
        });
    }

    public static void Enqueue(Session session)
    {
        _gameQueue.Enqueue(session);
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

        await StartEventReceived(sessions[0], sessions[1].NickName, true, game);
        await StartEventReceived(sessions[1], sessions[0].NickName, false, game);

        TotalPlayCountController.AddPlayCount();
    }

    public static List<Session> MakePair()
    {
        return new List<Session> { _gameQueue.Dequeue(), _gameQueue.Dequeue() };
    }

    public static void RemoveFromQueue(Session session)
    {
        _gameQueue = new Queue<Session>(_gameQueue.Where(q => q.SessionId != session.SessionId));
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