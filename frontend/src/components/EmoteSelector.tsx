import { motion, useAnimation } from "framer-motion";
import { FC, useState } from "react";
import styled from "styled-components";

const EMOTES = [
  "GGANG",
  "KINGA",
  "SUDDUN",
  "LAUGH",
  "PRAY",
  "RAGE",
  "ROFL",
  "SAD",
  "WAVE",
  "ZENY",
];

interface EmoteSelectorProps {
  onSelect: (emote: string) => void;
}

const EmoteSelector: FC<EmoteSelectorProps> = ({ onSelect }) => {
  const controls = useAnimation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container
      animate={controls}
      initial="close"
      variants={{
        close: {
          x: 400,
        },
        open: {
          x: 90,
        },
      }}
    >
      <Selector>
        <OpenIcon
          src="/static/images/open.svg"
          onClick={() => {
            setIsOpen(!isOpen);
            controls.start(isOpen ? "close" : "open");
          }}
        />

        <Emotes>
          {EMOTES.map((emote, index) => (
            <Emote
              key={index}
              src={`/static/emotes/${emote}.png`}
              onClick={() => onSelect(emote)}
            />
          ))}
        </Emotes>
      </Selector>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  top: 30vh;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 100000;
`;

const Selector = styled.div`
  background-color: black;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  padding: 10px;
  padding-right: 100px;

  display: flex;
  align-items: center;
`;

const OpenIcon = styled.img``;

const Emotes = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 50px);
  gap: 10px;
`;

const Emote = styled.img`
  width: 50px;
`;

export default EmoteSelector;
