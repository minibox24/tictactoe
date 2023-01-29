namespace Tictactoe.Game;

public class Nickname
{
    private static readonly string[] Prefixes =
    {
        "모땐",
        "악독한",
        "무친",
        "선량한",
        "잘생긴",
        "귀여운",
        "멋진",
        "냄새나는",
        "충성스러운",
        "멍청한",
        "부정형",
        "얼어붙은",
        "울고있는",
        "기분나쁜",
        "웃고있는",
        "슬픈",
        "기쁜",
        "긍정적인",
        "우왁굳의",
        "아이네의",
        "징버거의",
        "릴파의",
        "주르르의",
        "고세구의",
        "비챤의",
        "이세계",
        "두둥실떠오르는",
        "무서운",
        "너밖에모르는",
        "완전",
        "상자속의",
        "허접"
    };

    private static readonly string[] Names =
    {
        "팬치",
        "이파리",
        "둘기",
        "똥강아지",
        "박쥐",
        "주폭도",
        "세균단",
        "고라니",
        "키메라",
        "아메바",
        "진드기",
        "닭둘기",
        "왁무새",
        "침팬치",
        "느그자",
        "육수십덕",
        "오수구덕",
        "참새",
        "주폭단",
        "민수",
        "메일단",
        "헨타이",
        "히키코모리",
        "트수",
        "모시깽이",
        "까마귀",
        "충신",
        "아이돌",
        "돚거",
        "바보",
        "고양이",
        "짭치"
    };

    public static string Generate()
    {
        Random random = new();

        return Prefixes[random.Next(Prefixes.Length)] + Names[random.Next(Names.Length)];
    }
}