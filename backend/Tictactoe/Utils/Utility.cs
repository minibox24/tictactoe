using System.Text;

namespace Tictactoe.Utils;

public class Utility
{
    public static string BufferToString(byte[] buffer)
    {
        return Encoding.UTF8.GetString(buffer);
    }

    public static byte[] StringToBuffer(string str)
    {
        return Encoding.UTF8.GetBytes(str);
    }
}