import { AnimationControls, motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";

interface MyturnTextProps {
  controls: AnimationControls;
}

const MyturnText: FC<MyturnTextProps> = ({ controls }) => {
  return (
    <Container
      animate={controls}
      initial="hidden"
      variants={{
        hidden: {
          bottom: "-45px",
        },
        show: {
          bottom: "-7px",
        },
      }}
    >
      <Text>내 차례입니다!</Text>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  left: 0;

  width: 100vw;
  text-align: center;

  background-color: #007acc;
  padding-top: 3px;
  padding-bottom: 10px;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 1.5rem;

  color: white;
`;

export default MyturnText;
