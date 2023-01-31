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
        <button
          onClick={() => {
            controls.start("change");
          }}
        >
          Change
        </button>
        <button
          onClick={() => {
            controls.start("default");
          }}
        >
          Default
        </button>
        <button
          onClick={() => {
            controls.start("hidden");
          }}
        >
          Hidden
        </button>
        <button
          onClick={() => {
            controls.start("show");
          }}
        >
          Show
        </button>
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
`;

const Container = styled.div``;

export default App;
