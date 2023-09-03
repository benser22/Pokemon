import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import img1 from "../../assets/Overview/1.gif"
import img2 from "../../assets/Overview/2.gif"
import img3 from "../../assets/Overview/3.gif"


const DescriptionModal = ({ onClose }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const paragraphs = [
    {
      text: `Access the complete Pokédex to discover, explore, and manage all Pokémon, including the ability to add favorites, sort, filter, and access detailed information.`,
      image: img1,
    },
    {
      text: `Search for any Pokémon by name or ID, making it easy to find your favorites.`,
      image: img2,
    },
    {
      text: `Additionally, you can create your very own Pokémon! Use any image you prefer, or choose from a selection of preset random designs.`,
      image: img3,
    },
  ];
  

  useEffect(() => {
    let interval;

    if (!isPaused) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === paragraphs.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPaused, paragraphs.length]);

  const handlePauseToggle = () => {
    setIsPaused((prevState) => !prevState);
  };

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalContent>
          <ModalParagraph>{paragraphs[activeIndex].text}</ModalParagraph>
          <ModalImage
            src={paragraphs[activeIndex].image}
            alt={`Imagen ${activeIndex + 1}`}
          />
          <IndicatorContainer>
            {paragraphs.map((_, index) => (
              <IndicatorDot
                key={index}
                className={index === activeIndex ? "active" : ""}
                onClick={() => handleIndicatorClick(index)}
                as="div"
              />
            ))}
          </IndicatorContainer>
          <ButtonRow>
            <ModalButton onClick={handlePauseToggle}>
              {isPaused ? "Resume" : "Pause"}
            </ModalButton>
            <ModalButton onClick={onClose} style={{marginLeft: "2vh"}}>Close</ModalButton>
          </ButtonRow>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default DescriptionModal;

const pressAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(3px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateZ(-200px);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 15%;
  width: 70%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.8s ease;
`;

const ModalContent = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 0px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 80%;
  max-width: 80%;
  text-align: center;
  position: relative;
  margin: 0 auto;
  @media (max-width: 768px) {
    margin-top: 90%;
  }
`;

const ModalParagraph = styled.p`
  font-family: 'Comic Sans MS', cursive;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const ModalImage = styled.img`
  max-width: 40%;
  min-height: 20vh;
  height: auto;
  border-radius: 20px;
  margin: 0;
  margin-bottom: 20px;
  box-shadow: 0 0px 4px rgba(255,255, 255, 0.8);
`;

const ModalButton = styled.button`
  background-color: #375da4;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-left: 85%;

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    animation: ${pressAnimation} 0.2s ease;
    transform: translateY(3px);
  }
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const IndicatorDot = styled.div`
  width: 8px;
  height: 8px;
  border: solid darkblue 0.5px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;

  &.active {
    background-color: #007bff;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10000;
`;
