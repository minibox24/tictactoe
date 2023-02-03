import { FC } from "react";
import styled, { css } from "styled-components";

interface EmoteProps {
  emote: string;
  byMe: boolean;
}

const Emote: FC<EmoteProps> = ({ emote, byMe }) => {
  const random = Math.floor(Math.random() * 4);

  return (
    <Container random={random}>
      <EmoteImage src={`/static/emotes/${emote}.png`} />
    </Container>
  );
};

const Container = styled.div<{ random: number }>`
  position: absolute;

  pointer-events: none;
  z-index: 9999999;

  ${({ random }) => css`
    animation: ${`emote${random}`} 3s cubic-bezier(0.25, 0.25, 0.75, 0.75);
  `}

  animation-fill-mode: forwards;
  opacity: 0;

  @keyframes emote0 {
    0% {
      opacity: 0.6;
      bottom: 0;
      transform: scale(1);
      left: 0;
    }
    33% {
      opacity: 0.8;
      transform: scale(1.75);
      bottom: 100px;
      left: -10px;
    }
    66% {
      opacity: 0.8;
      transform: scale(1.75);
      bottom: 200px;
      left: -20px;
    }
    to {
      opacity: 0;
      transform: scale(1.25);
      bottom: 300px;
      left: -20px;
    }
  }

  @keyframes emote1 {
    0% {
      opacity: 0;
      bottom: 25px;
      transform: scale(1.4);
      left: 0;
    }
    25% {
      opacity: 0.6;
      transform: scale(2);
      bottom: 100px;
      left: 15px;
    }
    50% {
      opacity: 0.8;
      transform: scale(1.75);
      bottom: 175px;
      left: 10px;
    }
    75% {
      opacity: 0.8;
      transform: scale(1.5);
      bottom: 250px;
      left: 15px;
    }
    to {
      opacity: 0;
      transform: scale(1);
      bottom: 325px;
      left: 20px;
    }
  }

  @keyframes emote2 {
    0% {
      opacity: 0;
      bottom: -20px;
      transform: scale(1);
      left: 0;
    }
    33% {
      opacity: 0.8;
      transform: scale(1.6);
      bottom: 80px;
      left: 5px;
    }
    66% {
      opacity: 0.8;
      transform: scale(1.3);
      bottom: 190px;
      left: 10px;
    }
    to {
      opacity: 0;
      transform: scale(1);
      bottom: 290px;
      left: 15px;
    }
  }

  @keyframes emote3 {
    0% {
      opacity: 0.4;
      bottom: 60px;
      transform: scale(1);
      left: 0;
    }
    33% {
      opacity: 0.8;
      transform: scale(1.75);
      bottom: 160px;
      left: -5px;
    }
    66% {
      opacity: 0.8;
      transform: scale(1.25);
      bottom: 260px;
      left: -10px;
    }
    to {
      opacity: 0;
      transform: scale(1);
      bottom: 360px;
      left: -15px;
    }
  }
`;

const EmoteImage = styled.img`
  width: 30px;
`;

export default Emote;
