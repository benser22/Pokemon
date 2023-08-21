import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import img1 from "../../assets/images/p1.png";
import img2 from "../../assets/images/p2.png";
import img3 from "../../assets/images/p3.png";

const DescriptionModal = ({ onClose }) => {
  const paragraphs = [
    {
      text: `Personalización: Esta aplicación permite a los usuarios crear sus propios Pokemones a partir de información como nombre, estadísticas, imagenes randoms y tipo. La interfaz interactiva hace que el proceso de creación sea intuitivo y atractivo.`,
      image: img1,
    },
    {
      text: `Diseño Interactivo: La aplicación presenta una experiencia de usuario interactiva con controles deslizantes, casillas de verificación y campos de entrada. Los usuarios pueden ver los cambios en tiempo real y recibir retroalimentación en caso de errores.`,
      image: img2,
    },
    {
      text: `Creación Visual y Divertida: Con su diseño visualmente atractivo y opciones de personalización, la aplicación brinda a los fanáticos de Pokémon una forma divertida de dar vida a sus propias creaciones en el mundo Pokémon.`,
      image: img3,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === paragraphs.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => {
      clearInterval(interval);
    }; // eslint-disable-next-line
  }, []);

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalContent>
          <ModalImage
            src={paragraphs[activeIndex].image}
            alt={`Imagen ${activeIndex + 1}`}
          />
          <ModalParagraph>{paragraphs[activeIndex].text}</ModalParagraph>
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
          <ModalButton onClick={onClose}>Close</ModalButton>
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

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.8s ease;
`;

const ModalContent = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 0px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  min-width: 30%;
  text-align: center;
  position: relative;
  margin: 0 auto;
  @media (max-width: 768px) {
    margin-top: 90%;
  }
`;

const ModalParagraph = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const ModalImage = styled.img`
  max-width: 20%;
  max-height: 200px;
  height: auto;
  border-radius: 4px;
  margin: 0;
  margin-bottom: 20px;
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
