using System.Diagnostics.CodeAnalysis;

namespace Tictactoe.Game;

[SuppressMessage("ReSharper", "InconsistentNaming")]
public class JsonClasses
{
    public class CoreMessage
    {
        public string? type;
    }

    public class LoginMessage
    {
        public string type = "LOGIN";
        public string? nick;
    }

    public class PingMessage
    {
        public string type = "PING";
    }

    public class StartMessage
    {
        public string type = "START";
        public string? vs;
        public bool first;
        public bool isBot;
    }

    public class PlayMessage
    {
        public string? type = "PLAY";
        public int index;
        public int[]? board;
    }

    public class EndMessage
    {
        public string type = "END";
        public string? status;
    }

    public class ErrorMessage
    {
        public string type = "ERROR";
        public string? error;
    }

    public class PutMessage
    {
        public string type = "PUT";
        public int index;
    }

    public class EmoteMessage
    {
        public string type = "EMOTE";
        public string? emoji;
    }

    public class LeaveMessage
    {
        public string type = "LEAVE";
    }

    public class Status
    {
        public int now;
        public int total;
    }
}