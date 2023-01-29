import { useAnimation } from "framer-motion";
import styled from "styled-components";

import Ine from "./components/Ine";
import Tictactoe from "./components/Tictactoe";

function App() {
  const controls = useAnimation();

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
      <Tictactoe controls={controls} />
    </Container>
  );
}

const TestControler = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
`;

const Container = styled.div``;

export default App;
