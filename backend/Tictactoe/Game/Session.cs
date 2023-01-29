namespace Tictactoe.Game;

public struct Session
{
    public string SessionId { get; }
    public string NickName { get; }

    public Session(string sessionId, string nickName)
    {
        SessionId = sessionId;
        NickName = nickName;
    }
}