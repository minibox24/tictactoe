import { useAnimation } from "framer-motion";
import styled from "styled-components";

import { FC, useState } from "react";
import useWebSocket from "react-use-websocket";
import ConnectingPage from "./components/ConnectingPage";
import Ine from "./components/Ine";
import LobbyPage from "./components/LobbyPage";
import MyturnText from "./components/MyturnText";
import QueueingPage from "./components/QueueingPage";
import VSText from "./components/VSText";
import Wakpago from "./components/Wakpago";
import { Avatars, ClientMessageTypes, MessageTypes } from "./types/enums";
import { GameSession } from "./types/game";
import {
  EndMessage,
  ErrorMessage,
  LoginMessage,
  PlayMessage,
  PutMessage,
  QueueMessage,
  StartMessage,
} from "./types/messages";
import { Status as StatusResponse } from "./types/responses";

interface AppProps {}

enum Status {
  Connecting,
  Lobby,
  Queueing,
  Playing,
}

const App: FC<AppProps> = () => {
  const controls = useAnimation();

  const [avatar, setAvatar] = useState<Avatars>(Avatars.INE);

  const [status, setStatus] = useState<Status>(Status.Connecting);
  const [nick, setNick] = useState<string>("");
  const [failed, setFailed] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<StatusResponse | null>(null);

  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  const { sendMessage } = useWebSocket("ws://localhost:5214/ws", {
    onClose: () => setFailed(true),
    onMessage: (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      const type = data.type as MessageTypes;

      if (type in callback) {
        callback[type](data);
      }
    },
  });

  const callback = {
    [MessageTypes.LOGIN]: async (data: LoginMessage) => {
      try {
        const response = await fetch("http://localhost:5214/status");
        const status: StatusResponse = await response.json();

        setNick(data.nick);
        setStatusInfo(status);
        setStatus(Status.Lobby);
      } catch {
        setFailed(true);
      }
    },
    [MessageTypes.START]: (data: StartMessage) => {
      const session: GameSession = {
        vs: data.vs,
        isFirst: data.first,
        myTurn: data.first,
        board: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      };

      if (session.myTurn) {
        controls.set("show");
      }

      setGameSession(session);
      setStatus(Status.Playing);

      controls.start("change");
    },
    [MessageTypes.PLAY]: (data: PlayMessage) => {
      if (!gameSession) return;

      setGameSession((prev: GameSession | null) => {
        if (!prev) return prev;

        return {
          ...prev,
          myTurn: true,
          board: data.board,
        };
      });

      controls.set("show");
    },
    [MessageTypes.END]: (data: EndMessage) => {
      console.log(data);
    },
    [MessageTypes.ERROR]: (data: ErrorMessage) => {
      console.log(data);
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
      <TestControler>
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
      </TestControler>

      {status === Status.Playing && gameSession && (
        <VSText player1={nick} player2={gameSession.vs} />
      )}

      {getAvatar()}

      <MyturnText controls={controls} />

      {status === Status.Connecting && <ConnectingPage failed={failed} />}

      {status === Status.Lobby && (
        <LobbyPage nick={nick} status={statusInfo} onQueued={onQueued} />
      )}

      {status === Status.Queueing && (
        <QueueingPage
          onCanceled={() => {
            setStatus(Status.Lobby);
          }}
        />
      )}
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

export default App;
