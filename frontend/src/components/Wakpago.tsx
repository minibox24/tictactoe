import { AnimationControls, motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";
import { GameSession } from "../types/game";
import Tictactoe from "./Tictactoe";

interface WakpagoProps {
  controls: AnimationControls;
  session: GameSession | null;
  onCheck: (index: number) => void;
}

const Zoom = 3;
const HeadScaleX = 1.5;
const HeadScaleY = 2.5;

const Wakpago: FC<WakpagoProps> = ({ controls, session, onCheck }) => {
  return (
    <FullscreenContainer>
      <WakpagoContainer
        variants={containerVariants}
        initial="default"
        animate={controls}
      >
        <Head variants={headVariants} initial="default" animate={controls}>
          <Tictactoe
            session={session}
            onCheck={onCheck}
            controls={controls}
            transformX={Zoom * HeadScaleX}
            transformY={Zoom * HeadScaleY}
            yPosition={-35}
          />
        </Head>

        <Body variants={bodyVariants} initial="default" animate={controls} />
      </WakpagoContainer>
    </FullscreenContainer>
  );
};

const containerVariants = {
  default: {
    transform: "translate(0, 0) scale(1)",
  },
  change: {
    transform: `translate(0, 135%) scale(${Zoom})`,
    transition: {
      duration: 1,
      delay: 1.5,
    },
  },
};

const headVariants = {
  default: {
    transform: "scale(1, 1)",
  },
  change: {
    transform: `scale(${HeadScaleX}, ${HeadScaleY})`,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};

const bodyVariants = {
  default: {
    transform: "scaleX(1)",
  },
  change: {
    transform: "scaleX(1.5)",
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

const WakpagoContainer = styled(motion.div)``;

const WakpagoParts = styled(motion.div)`
  width: 110vw;
  max-width: 593px;

  background-size: contain;
  background-repeat: no-repeat;
`;

const Head = styled(WakpagoParts)`
  transform-origin: bottom;

  background-image: url("/static/images/wakpago_head.png");

  aspect-ratio: 715 / 147;

  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Body = styled(WakpagoParts)`
  margin-top: -1px;

  background-image: url("/static/images/wakpago_body.png");

  aspect-ratio: 715 / 556;
`;

export default Wakpago;
