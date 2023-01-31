import { useAnimation } from "framer-motion";
import styled from "styled-components";

import { FC, useState } from "react";
import Ine from "./components/Ine";
import MainPage from "./components/MainPage";
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
  const [status, setStatus] = useState<Status>(Status.Playing);

  return (
    <Container>
      <TestControler>
        <button
          onClick={() => {
            controls.start("change");
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            controls.set("default");
          }}
        >
          Rollback
        </button>
      </TestControler>

      <VSText player1="두둥실떠오르는히키코모리" player2="악질민수" />

      <Ine controls={controls} />

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
