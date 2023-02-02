import { useAnimation } from "framer-motion";
import styled from "styled-components";

import { FC, useState } from "react";
import useWebSocket from "react-use-websocket";
import ConnectingPage from "./components/ConnectingPage";
import Emote from "./components/Emote";
import EmoteSelector from "./components/EmoteSelector";
import Gameover from "./components/Gameover";
import Ine from "./components/Ine";
import LobbyPage from "./components/LobbyPage";
import MyturnText from "./components/MyturnText";
import QueueingPage from "./components/QueueingPage";
import VSText from "./components/VSText";
import Wakpago from "./components/Wakpago";
import { Avatars, ClientMessageTypes, MessageTypes } from "./types/enums";
import { GameSession } from "./types/game";
import {
  EmoteMessage,
  EndMessage,
  ErrorMessage,
  LoginMessage,
  PingMessage,
  PlayMessage,
  PongMessage,
  PutMessage,
  QueueMessage,
  StartMessage,
  UnqueueMessage,
} from "./types/messages";
import { Status as StatusResponse } from "./types/responses";
import { playSound } from "./utils/PlaySound";

const SECURE = false;
const HOST = "localhost:5214";

interface AppProps {}

enum Status {
  Connecting,
  Lobby,
  Queueing,
  Playing,
}

const avatars = [Avatars.INE, Avatars.WAKPAGO];

const App: FC<AppProps> = () => {
  const controls = useAnimation();

  const avatarIndex = Math.floor(Math.random() * avatars.length);
  const [avatar, setAvatar] = useState<Avatars>(avatars[avatarIndex]);

  const [status, setStatus] = useState<Status>(Status.Connecting);
  const [nick, setNick] = useState<string>("");
  const [failed, setFailed] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<StatusResponse | null>(null);

  const [emotes, setEmotes] = useState<any[]>([]);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  const { sendMessage } = useWebSocket(
    `${SECURE ? "wss" : "ws"}://${HOST}/ws`,
    {
      onClose: () => {
        reGame();
        setFailed(true);
        setStatus(Status.Connecting);
      },

      shouldReconnect: () => true,

      // TODO: 더 나은 전체 리렌더 방법 찾기
      filter: (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        const type = data.type as MessageTypes;
        if (type in callback) {
          callback[type](data);
        }

        if (type === MessageTypes.PING) {
          return false;
        }

        return true;
      },
    }
  );

  const callback = {
    [MessageTypes.LOGIN]: async (data: LoginMessage) => {
      try {
        const response = await fetch(
          `${SECURE ? "https" : "http"}://${HOST}/status`
        );
        const status: StatusResponse = await response.json();

        setNick(data.nick);
        setStatusInfo(status);
        setStatus(Status.Lobby);
      } catch {
        setFailed(true);
      }
    },
    [MessageTypes.PING]: (data: PingMessage) => {
      const payload: PongMessage = {
        type: ClientMessageTypes.PONG,
      };

      sendMessage(JSON.stringify(payload));
    },
    [MessageTypes.START]: (data: StartMessage) => {
      controls.set("hidden");
      controls.set("default");

      const session: GameSession = {
        vs: data.vs,
        isFirst: data.first,
        myTurn: data.first,
        board: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        endType: null,
      };

      if (session.myTurn) {
        controls.start("show");
      }

      setGameSession(session);
      setStatus(Status.Playing);

      controls.start("change");

      playSound("/static/sounds/Find.mp3");
    },
    [MessageTypes.PLAY]: (data: PlayMessage) => {
      if (!gameSession) return;

      playSound("/static/sounds/chap.mp3");

      setGameSession((prev: GameSession | null) => {
        if (!prev) return prev;

        return {
          ...prev,
          myTurn: true,
          board: data.board,
        };
      });

      controls.start("show");
    },
    [MessageTypes.END]: (data: EndMessage) => {
      controls.stop();
      controls.set("hidden");
      setGameSession((prev: GameSession | null) => {
        if (!prev) return prev;

        return {
          ...prev,
          myTurn: false,
          endType: data.status,
        };
      });
    },
    [MessageTypes.EMOTE]: (data: EmoteMessage) => {
      addEmote(data.emoji, false);
    },
    [MessageTypes.ERROR]: (data: ErrorMessage) => {
      console.error(data.error);
    },
  };

  const onQueued = () => {
    setStatus(Status.Queueing);

    const payload: QueueMessage = {
      type: ClientMessageTypes.QUEUE,
    };

    sendMessage(JSON.stringify(payload));
  };

  const onCheck = (index: number) => {
    const payload: PutMessage = {
      type: ClientMessageTypes.PUT,
      index,
    };

    setGameSession((prev: GameSession | null) => {
      if (!prev) return prev;

      const board = prev.board;
      board[index] = prev.isFirst ? 0 : 1;

      return {
        ...prev,
        myTurn: false,
        board,
      };
    });

    sendMessage(JSON.stringify(payload));
    controls.start("hidden");
  };

  const onCanceled = () => {
    const payload: UnqueueMessage = {
      type: ClientMessageTypes.UNQUEUE,
    };

    (async () => {
      const response = await fetch(
        `${SECURE ? "https" : "http"}://${HOST}/status`
      );
      const status: StatusResponse = await response.json();

      setStatusInfo(status);
    })();

    sendMessage(JSON.stringify(payload));
    reGame();
  };

  const reGame = () => {
    controls.set("hidden");
    controls.set("default");

    const avatarIndex = Math.floor(Math.random() * avatars.length);

    (async () => {
      const response = await fetch(
        `${SECURE ? "https" : "http"}://${HOST}/status`
      );
      const status: StatusResponse = await response.json();

      setStatusInfo(status);
    })();

    setGameSession(null);
    setAvatar(avatars[avatarIndex]);
    setStatus(Status.Lobby);
  };

  const addEmote = (emote: string, byMe: boolean) => {
    const emoteElement = (
      <Emote emote={emote} byMe={byMe} key={Math.random()} />
    );

    setEmotes((prev) => [...prev, emoteElement]);

    setTimeout(() => {
      setEmotes((prev) => {
        const idx = prev.indexOf(emoteElement);
        if (idx === -1) return prev;

        prev.splice(idx, 1);

        return prev;
      });
    }, 1400);
  };

  const selectEmote = (emote: string) => {
    const payload: EmoteMessage = {
      type: ClientMessageTypes.EMOTE,
      emoji: emote,
    };

    sendMessage(JSON.stringify(payload));
    addEmote(emote, true);
  };

  const getAvatar = () => {
    switch (avatar) {
      case Avatars.INE:
        return (
          <Ine controls={controls} session={gameSession} onCheck={onCheck} />
        );
      case Avatars.WAKPAGO:
        return (
          <Wakpago
            controls={controls}
            session={gameSession}
            onCheck={onCheck}
          />
        );
    }
  };

  return (
    <Container>
      {/* <TestControler>
        <TCRow>
          Controls start:{" "}
          <button
            onClick={() => {
              controls.start("change");
            }}
          >
            change
          </button>
          <button
            onClick={() => {
              controls.start("default");
            }}
          >
            default
          </button>
          <button
            onClick={() => {
              controls.start("hidden");
            }}
          >
            hidden
          </button>
          <button
            onClick={() => {
              controls.start("show");
            }}
          >
            show
          </button>
        </TCRow>

        <TCRow>
          Controls set:{" "}
          <button
            onClick={() => {
              controls.set("change");
            }}
          >
            change
          </button>
          <button
            onClick={() => {
              controls.set("default");
            }}
          >
            default
          </button>
          <button
            onClick={() => {
              controls.set("hidden");
            }}
          >
            hidden
          </button>
          <button
            onClick={() => {
              controls.set("show");
            }}
          >
            show
          </button>
        </TCRow>

        <TCRow>
          Status set:{" "}
          <button
            onClick={() => {
              setStatus(Status.Connecting);
            }}
          >
            Connecting
          </button>
          <button
            onClick={() => {
              setStatus(Status.Lobby);
            }}
          >
            Lobby
          </button>
          <button
            onClick={() => {
              setStatus(Status.Queueing);
            }}
          >
            Queueing
          </button>
          <button
            onClick={() => {
              setStatus(Status.Playing);
            }}
          >
            Playing
          </button>
        </TCRow>
      </TestControler> */}

      {status === Status.Playing && gameSession && (
        <>
          <VSText player1={nick} player2={gameSession.vs} />
          <EmoteSelector onSelect={selectEmote} />
        </>
      )}

      {getAvatar()}

      <MyturnText controls={controls} />

      {gameSession?.endType && (
        <Gameover session={gameSession} reGame={reGame} />
      )}

      {/* Pages */}
      {status === Status.Connecting && <ConnectingPage failed={failed} />}
      {status === Status.Queueing && <QueueingPage onCanceled={onCanceled} />}
      {status === Status.Lobby && (
        <LobbyPage nick={nick} status={statusInfo} onQueued={onQueued} />
      )}

      <Emotes>{emotes}</Emotes>
    </Container>
  );
};

const TestControler = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;

  color: white;
`;

const TCRow = styled.div``;

const Container = styled.div``;

const Emotes = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
`;

export default App;
