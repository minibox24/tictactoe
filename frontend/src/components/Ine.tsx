import { AnimationControls, motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";
import Tictactoe from "./Tictactoe";

interface IneProps {
  controls: AnimationControls;
}

const Ine: FC<IneProps> = ({ controls }) => {
  return (
    <FullscreenContainer>
      <IneContainer
        variants={containerVariants}
        initial="default"
        animate={controls}
      >
        <Hair variants={hairVariants} initial="default" animate={controls} />

        <Head variants={headVariants} initial="default" animate={controls}>
          <Tictactoe controls={controls} />
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
    transform: "translate(0, 125%) scale(3)",
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
    transform: "scaleY(1)",
  },
  change: {
    transform: "scaleY(2)",
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

const IneContainer = styled(motion.div)`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
`;

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

  background-image: url("/static/images/hair.png");

  aspect-ratio: 593 / 632;
`;

const Head = styled(IneParts)`
  transform-origin: bottom;

  background-image: url("/static/images/head.png");

  aspect-ratio: 593 / 152;

  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Body = styled(IneParts)`
  margin-top: -1px;

  background-image: url("/static/images/body.png");

  aspect-ratio: 593 / 550;
`;

export default Ine;
