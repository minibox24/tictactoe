import { AnimationControls, motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";
import { GameSession } from "../types/game";
import { playSound } from "../utils/PlaySound";

const boardMap = {
  [-1]: null,
  0: "X",
  1: "O",
};

interface TictactoeProps {
  session: GameSession | null;
  onCheck: (index: number) => void;
  controls: AnimationControls;
  transformX?: number;
  transformY?: number;
  yPosition?: number;
}

const Tictactoe: FC<TictactoeProps> = ({
  session,
  onCheck,
  controls,
  transformX = 1,
  transformY = 1,
  yPosition = -15,
}) => {
  const TTTClick = (index: number) => {
    if (!session?.myTurn) return;
    if (session?.board[index] !== -1) return;

    onCheck(index);

    playSound("/static/sounds/chap.mp3");
  };

  return (
    <TTTWrapper
      variants={tttVariants}
      initial="default"
      animate={controls}
      style={{
        transform: `scale(${100 / transformX}%, ${100 / transformY}%)`,
      }}
    >
      <TTTContainer
        style={{
          marginTop: `${yPosition}%`,
        }}
      >
        {session?.board.map((value, index) => (
          <TTTElement key={index} onClick={() => TTTClick(index)}>
            {boardMap[value]}
          </TTTElement>
        ))}
      </TTTContainer>
    </TTTWrapper>
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

const TTTWrapper = styled(motion.div)`
  position: absolute;

  width: 100%;
  height: 100%;

  max-width: 90vw;

  aspect-ratio: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TTTContainer = styled.div`
  display: grid;

  width: 100%;
  height: 100%;

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
