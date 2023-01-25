import { useState } from "react";
import styled from "styled-components";

function App() {
  const [isO, setIsO] = useState<boolean>(false);
  const [TTT, setTTT] = useState<(null | "O" | "X")[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const isEnd = (ttt: (null | "O" | "X")[]) => {
    let isWin = false;

    const winMap = [123, 456, 789, 147, 258, 369, 357, 159];

    winMap.forEach((value) => {
      const [a, b, c] = value.toString().split("");

      const aa = ttt[Number(a) - 1];
      const bb = ttt[Number(b) - 1];
      const cc = ttt[Number(c) - 1];

      if (aa === bb && bb === cc && aa !== null) {
        isWin = true;

        alert(`${aa}님이 이겼습니다!`);
        setTTT([null, null, null, null, null, null, null, null, null]);
      }
    });

    if (!isWin && !ttt.includes(null)) {
      alert("무승부입니다!");
      setTTT([null, null, null, null, null, null, null, null, null]);
    }
  };

  const TTTClick = (index: number) => {
    if (TTT[index] !== null) return;

    const newTTT = [...TTT];
    newTTT[index] = isO ? "O" : "X";
    setTTT(newTTT);

    setIsO(!isO);

    isEnd(newTTT);
  };

  return (
    <Container>
      <IneContainer>
        <Ine>
          <Hair src="/static/images/hair.png" />
          <Head src="/static/images/head.png" />
          <Body src="/static/images/body.png" />
        </Ine>
      </IneContainer>
      <TTTWrapper>
        <TTTContainer>
          {TTT.map((value, index) => (
            <TTTElement key={index} onClick={() => TTTClick(index)}>
              {value}
            </TTTElement>
          ))}
        </TTTContainer>
      </TTTWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`;

const IneContainer = styled.div``;

const Ine = styled.div`
  position: relative;

  animation: zoom 1s;
  animation-delay: 3500ms;
  animation-fill-mode: forwards;

  @keyframes zoom {
    from {
      transform: translate(0, 0) scale(1);
    }

    to {
      transform: translate(0, 125%) scale(3);
    }
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Hair = styled.img`
  position: absolute;
  top: -15%;

  z-index: 10;

  animation: 머리 3s;
  animation-fill-mode: forwards;

  @keyframes 머리 {
    30% {
      transform: scale(1) translate(0, 0);
    }

    to {
      transform: scale(0.5) translate(110vw, -110vh);
    }
  }
`;

const Head = styled.img`
  animation: 대머리 2s;
  animation-delay: 2s;
  animation-fill-mode: forwards;
  transform-origin: bottom;

  @keyframes 대머리 {
    from {
      transform: scaleY(1);
    }

    to {
      transform: scaleY(2);
    }
  }
`;

const Body = styled.img`
  margin-top: -1px;
`;

const TTTWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  animation: show 500ms;
  animation-delay: 4500ms;
  animation-fill-mode: forwards;

  opacity: 0;

  @keyframes show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const TTTContainer = styled.div`
  width: 600px;
  height: 600px;

  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
`;

const TTTElement = styled.div`
  cursor: pointer;

  box-sizing: border-box;
  aspect-ratio: 1;

  &:nth-child(3n),
  &:nth-child(3n-1) {
    border-left: 4px solid black;
  }

  &:nth-child(n + 4) {
    border-top: 4px solid black;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 100px;
`;

export default App;
