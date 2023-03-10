import { AnimationControls, motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";
import { GameSession } from "../types/game";
import Tictactoe from "./Tictactoe";

interface IneProps {
  controls: AnimationControls;
  session: GameSession | null;
  onCheck: (index: number) => void;
}

const Zoom = 3;
const HeadScaleX = 1;
const HeadScaleY = 2;

const Ine: FC<IneProps> = ({ controls, session, onCheck }) => {
  return (
    <FullscreenContainer>
      <IneContainer
        variants={containerVariants}
        initial="default"
        animate={controls}
      >
        <Hair variants={hairVariants} initial="default" animate={controls} />

        <Head variants={headVariants} initial="default" animate={controls}>
          <Tictactoe
            session={session}
            onCheck={onCheck}
            controls={controls}
            transformX={Zoom * HeadScaleX}
            transformY={Zoom * HeadScaleY}
          />
        </Head>

        <Body />
      </IneContainer>
    </FullscreenContainer>
  );
};

const containerVariants = {
  default: {
    transform: "translate(0, 0) scale(1)",
  },
  change: {
    transform: `translate(0, 125%) scale(${Zoom})`,
    transition: {
      duration: 1,
      delay: 1.5,
    },
  },
};

const hairVariants = {
  default: {
    transform: "scale(1) translate(0, 0)",
  },
  change: {
    transform: "scale(0) translate(400vw, -400vh)",
    transition: {
      duration: 2,
    },
  },
};

const headVariants = {
  default: {
    transform: `scaleY(1)`,
  },
  change: {
    transform: `scaleY(${HeadScaleY})`,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};

const FullscreenContainer = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const IneContainer = styled(motion.div)``;

const IneParts = styled(motion.div)`
  width: 110vw;
  max-width: 593px;

  background-size: contain;
  background-repeat: no-repeat;
`;

const Hair = styled(IneParts)`
  position: absolute;
  top: -15%;

  z-index: 10;

  background-image: url("/static/images/ine_hair.png");

  aspect-ratio: 593 / 632;
`;

const Head = styled(IneParts)`
  transform-origin: bottom;

  background-image: url("/static/images/ine_head.png");

  aspect-ratio: 593 / 152;

  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Body = styled(IneParts)`
  margin-top: -1px;

  background-image: url("/static/images/ine_body.png");

  aspect-ratio: 593 / 550;
`;

export default Ine;
