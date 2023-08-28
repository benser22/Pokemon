import React from "react";
import styled, { keyframes } from "styled-components";
import { logoutAction } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

const ConfirmationModal = ({ onClose, setLogout }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    setLogout(true);
    onClose();
    dispatch(logoutAction());
  };

  return (
    <Overlay>
      <ModalContent>
        <CustomText>Are you sure you want to log out?</CustomText>
        <ButtonContainer>
          <ModalButton onClick={handleLogout}>Log Out</ModalButton>
          <ModalButton onClick={onClose}>Cancel</ModalButton>
        </ButtonContainer>
      </ModalContent>
    </Overlay>
  );
};

export default ConfirmationModal;

const pressAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(2px);
  }
`;

const ModalContent = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
  text-align: center;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    margin-top: 90%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CustomText = styled.p`
  font-size: 24px;
  color: white;
  font-family: "Helvetica Neue", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const ModalButton = styled.button`
  background-color: #375da4;
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
