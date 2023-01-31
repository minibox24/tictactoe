import { useAnimation } from "framer-motion";
import styled from "styled-components";

import { FC, useState } from "react";
import Ine from "./components/Ine";
import MainPage from "./components/MainPage";
import QueueingPage from "./components/QueueingPage";

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

const Main = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);
  z-index: 100;

  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  color: white;

  font-size: 6rem;
  text-shadow: 0 0 10px black;
`;

export default App;
