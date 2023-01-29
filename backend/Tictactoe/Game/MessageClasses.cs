namespace Tictactoe.Game;

public class MessageClasses
{
    public class CoreMessage
    {
        public string type;
    }

    public class LoginMessage
    {
        public string type = "LOGIN";
        public string nick;
    }

    public class StartMessage
    {
        public string type = "START";
        public string vs;
        public bool first;
    }

    public class PlayMessage
    {
        public string type = "PLAY";
        public int index;
    }

    public class EndMessage
    {
        public string type = "END";
        public string status;
    }

    public class ErrorMessage
    {
        public string type = "ERROR";
        public string error;
    }

    public class QueueMessage
    {
        public string type = "QUEUE";
    }

    public class PutMessage
    {
        public string type = "PUT";
        public int index;
    }
}