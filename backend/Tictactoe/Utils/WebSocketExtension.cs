using System.Net.WebSockets;

namespace Tictactoe.Utils;

public static class WebSocketExtension
{
    public static async Task<(string, WebSocketReceiveResult)> ReceiveStringAsync(this WebSocket webSocket)
    {
        return await webSocket.ReceiveStringAsync(CancellationToken.None);
    }

    public static async Task<(string, WebSocketReceiveResult)> ReceiveStringAsync(this WebSocket webSocket,
        CancellationToken cancellationToken)
    {
        var buffer = new byte[1024 * 4];

        var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), cancellationToken);

        string str = Utility.BufferToString(buffer).Substring(0, result.Count);

        return (str, result);
    }

    public static async Task SendStringAsync(this WebSocket webSocket, string str)
    {
        await webSocket.SendStringAsync(str, WebSocketMessageType.Text, true, CancellationToken.None);
    }

    public static async Task SendStringAsync(this WebSocket webSocket, string str, WebSocketMessageType messageType,
        bool endOfMessage, CancellationToken cancellationToken)
    {
        var buffer = Utility.StringToBuffer(str);

        await webSocket.SendAsync(new ArraySegment<byte>(buffer, 0, buffer.Length), messageType,
            endOfMessage,
            cancellationToken);
    }

    public static async Task CloseAsync(this WebSocket webSocket, WebSocketReceiveResult receiveResult)
    {
        await webSocket.CloseAsync(receiveResult.CloseStatus!.Value, receiveResult.CloseStatusDescription,
            CancellationToken.None);
    }
}