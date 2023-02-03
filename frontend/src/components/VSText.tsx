import { FC } from "react";
import styled, { css } from "styled-components";

interface VSTextProps {
  player1: string;
  player2: string;
  isBot: boolean;
}

const VSText: FC<VSTextProps> = ({ player1, player2, isBot }) => {
  return (
    <Container>
      <TextContainer>
        <Text>{player1} (나)</Text>
        <Text isVS>VS</Text>
        <Text>
          {player2}
          {isBot ? " (봇)" : ""}
        </Text>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 100000;
`;

const TextContainer = styled.div`
  margin-top: 5vh;
  margin: 5vh 1rem 0 1rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  max-width: fit-content;

  gap: 0.5rem;

  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  @media screen and (max-width: 450px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    gap: 0;
  }
`;

const Text = styled.span<{ isVS?: boolean }>`
  text-align: center;
  font-weight: 500;
  font-size: 2rem;

  color: white;

  @media screen and (max-width: 400px) {
    font-size: 1.5rem;
  }

  ${({ isVS }) =>
    isVS &&
    css`
      color: red;
      font-weight: 900;
    `};
`;

export default VSText;
