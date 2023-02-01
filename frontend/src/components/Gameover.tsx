import { motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";
import { EndTypes } from "../types/enums";
import { GameSession } from "../types/game";
import { playSound } from "../utils/PlaySound";

interface GameoverProps {
  session: GameSession | null;
  reGame: () => void;
}

const Gameover: FC<GameoverProps> = ({ session, reGame }) => {
  if (!session) return null;
  if (!session.endType) return null;

  switch (session.endType) {
    case EndTypes.WIN:
      playSound("/static/sounds/Win.mp3");
      break;
    case EndTypes.LOSE:
      playSound("/static/sounds/Lose.mp3");
      break;
    case EndTypes.DRAW:
      playSound("/static/sounds/Draw.mp3");
      break;
    case EndTypes.LEAVE:
      playSound("/static/sounds/Draw.mp3");
  }

  const text = {
    [EndTypes.WIN]: "승리했습니다!",
    [EndTypes.LOSE]: "패배했습니다!",
    [EndTypes.DRAW]: "비겼습니다!",
    [EndTypes.LEAVE]: "상대방이 게임에서 탈주했습니다!",
  }[session.endType];

  return (
    <Container>
      <Modal
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
      >
        <Text>{text}</Text>
        <ReplayButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reGame}
        >
          다시 시작하기
        </ReplayButton>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;

  & > * {
    z-index: 1;
  }
`;

const Modal = styled(motion.div)`
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;

  text-align: center;
`;

const Text = styled.span`
  font-size: 2rem;
`;

const ReplayButton = styled(motion.div)`
  margin-top: 1rem;

  background: white;
  color: black;

  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;

  padding: 0.5rem 1rem;
  border-radius: 10px;
`;

export default Gameover;
