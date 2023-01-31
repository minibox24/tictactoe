import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface QueueingPageProps {
  onCanceled: () => void;
}

const QueueingPage: FC<QueueingPageProps> = ({ onCanceled }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 400);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <Background />

      <Center>
        <Title>틱택토</Title>
        <Status>게임을 찾는 중{".".repeat(dots)}</Status>
        <CancelButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onCanceled}
        >
          취소
        </CancelButton>
      </Center>

      {/* Dummy */}
      <Footer>
        <FooterText>&#8203;</FooterText>
        <FooterText>&#8203;</FooterText>
        <FooterText>&#8203;</FooterText>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;

  & > * {
    z-index: 1;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const Center = styled.div`
  margin: auto 0;
  padding-top: 10vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`;

const Title = styled.h1`
  margin: 0;

  font-size: 6rem;
  text-shadow: 0 0 10px black;
`;

const Status = styled.span``;

const CancelButton = styled(motion.div)`
  margin-top: 2rem;

  background: #d83c3e;
  color: white;

  font-size: 1.5rem;
  font-weight: 700;

  padding: 1rem 2rem;
  border-radius: 1rem;
`;

const Footer = styled.div`
  margin-top: auto;
  margin-right: auto;

  padding: 0.5rem;
`;

const FooterText = styled.p`
  margin: 0;
`;

export default QueueingPage;
