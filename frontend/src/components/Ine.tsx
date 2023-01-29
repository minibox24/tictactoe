import { AnimationControls, motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";

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
        <Hair
          src="/static/images/hair.png"
          variants={hairVariants}
          initial="default"
          animate={controls}
        />

        <Head
          src="/static/images/head.png"
          variants={headVariants}
          initial="default"
          animate={controls}
        />

        <Body src="/static/images/body.png" />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Hair = styled(motion.img)`
  position: absolute;
  top: -15%;

  z-index: 10;
`;

const Head = styled(motion.img)`
  transform-origin: bottom;
`;

const Body = styled.img`
  margin-top: -1px;
`;

export default Ine;
