import React from "react";
import styled, { keyframes } from "styled-components";

const MessageModal = ({ onClose, message}) => {
  
  return (
    <Overlay>
      <ModalContent>
        <CustomText>{message}</CustomText>
        <ModalButton onClick={onClose}>OK</ModalButton>
      </ModalContent>
    </Overlay>
  );
};

export default MessageModal;

const pressAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(2px);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
  max-width: 40%;
  min-width: 20%;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%); /* Ajusta para centrar completamente */

  @media (max-width: 768px) {
    margin-top: 90%;
  }
`;

const CustomText = styled.p`
  font-size: 24px;
  color: white;
  font-family: "Helvetica Neue", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const ModalButton = styled.button`
  background-color: #375da4;
  font-size: 14px;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    animation: ${pressAnimation} 0.2s ease;
    transform: translateY(2px);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10000;
`;
