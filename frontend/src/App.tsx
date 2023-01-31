import { useAnimation } from "framer-motion";
import styled from "styled-components";

import { FC, useState } from "react";
import Ine from "./components/Ine";
import MainPage from "./components/MainPage";
import MyturnText from "./components/MyturnText";
import QueueingPage from "./components/QueueingPage";
import VSText from "./components/VSText";

interface AppProps {}

enum Status {
  Lobby,
  Queueing,
  Playing,
}

const App: FC<AppProps> = () => {
  const controls = useAnimation();
  const [status, setStatus] = useState<Status>(Status.Lobby);

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

      {status === Status.Playing && (
        <VSText player1="플레이어1" player2="플레이어2" />
      )}

      <Ine controls={controls} />

      <MyturnText controls={controls} />

      {status === Status.Lobby && (
        <MainPage
          onQueued={() => {
            setStatus(Status.Queueing);
          }}
        />
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
