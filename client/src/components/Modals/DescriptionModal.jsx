import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import img1 from "../../assets/images/p1.png";
import img2 from "../../assets/images/p2.png";
import img3 from "../../assets/images/p3.png";

const DescriptionModal = ({ onClose }) => {
  const paragraphs = [
    {
      text: "Este es el primer párrafo de la descripción.",
      image: img1,
    },
    {
      text: "Aquí tienes el segundo párrafo de la descripción.",
      image: img2,
    },
    {
      text: "Y finalmente, el tercer párrafo de la descripción.",
      image: img3,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === paragraphs.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => {
      clearInterval(interval);
    };// eslint-disable-next-line
  }, []);

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
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
              active={index === activeIndex}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </IndicatorContainer>
        <ModalButton onClick={onClose}>Close</ModalButton>
      </ModalContent>
    </ModalContainer>
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
  margin-top: 20%;
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
  background-color: ${({ active }) => (active ? "#007bff" : "#ccc")};
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
`;
