import { motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  return (
    <Container>
      <Background />

      <Center>
        <Title>틱택토</Title>
        <Playing>345명이 플레이 중</Playing>
        <PlayButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          플레이하기
        </PlayButton>
      </Center>

      <Footer>
        <FooterText>1234회 플레이 됨</FooterText>
        <FooterText>메일단은 여기로: minibox724@gmail.com</FooterText>
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

const Playing = styled.span``;

const PlayButton = styled(motion.div)`
  margin-top: 2rem;

  background: white;
  color: black;

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

export default MainPage;
