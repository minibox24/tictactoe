import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface ConnectingPageProps {
  failed: boolean;
}

const ConnectingPage: FC<ConnectingPageProps> = ({ failed }) => {
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
        {failed ? (
          <Text>서버 연결 실패</Text>
        ) : (
          <Text>서버와 연결 중{".".repeat(dots)}</Text>
        )}
      </Center>
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

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`;

const Text = styled.span``;

export default ConnectingPage;
