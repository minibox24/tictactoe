import { AnimationControls, motion } from "framer-motion";
import { FC, useState } from "react";
import styled from "styled-components";

interface TictactoeProps {
  controls: AnimationControls;
}

const Tictactoe: FC<TictactoeProps> = ({ controls }) => {
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
    <FullscreenContainer>
      <TTTWrapper variants={tttVariants} initial="default" animate={controls}>
        <TTTContainer>
          {TTT.map((value, index) => (
            <TTTElement key={index} onClick={() => TTTClick(index)}>
              {value}
            </TTTElement>
          ))}
        </TTTContainer>
      </TTTWrapper>
    </FullscreenContainer>
  );
};

const tttVariants = {
  default: {
    opacity: 0,
    display: "none",
  },
  change: {
    opacity: 1,
    display: "flex",
    transition: {
      delay: 2.5,
    },
  },
};

const FullscreenContainer = styled.div`
  position: fixed;

  top: 10%;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TTTWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
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

export default Tictactoe;
