using File = System.IO.File;

namespace Tictactoe;

public class TotalPlayCountController
{
    private static readonly string FileDir =
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), ".tictactoe_playCount");

    private static DateTime _lastSavedTime = DateTime.MinValue;

    public static int TotalPlayCount { get; private set; }

    static TotalPlayCountController()
    {
        if (File.Exists(FileDir))
        {
            TotalPlayCount = Load();
        }
        else
        {
            TotalPlayCount = 0;

            Save(0);
        }
    }

    private static int Load()
    {
        return int.Parse(File.ReadAllText(FileDir));
    }

    private static void Save(int playCount)
    {
        if ((DateTime.Now - _lastSavedTime).TotalMinutes < 1)
        {
            return;
        }

        _lastSavedTime = DateTime.Now;

        File.WriteAllTextAsync(FileDir, playCount.ToString());
    }

    public static void AddPlayCount()
    {
        TotalPlayCount++;

        Save(TotalPlayCount);
    }
}