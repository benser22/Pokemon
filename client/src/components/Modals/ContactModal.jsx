import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaBroom } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      Swal.fire("Warning", "Please enter your name.", "warning");
      return;
    }

    if (!formData.email) {
      Swal.fire("Warning", "Please enter your email address.", "warning");
      return;
    }

    if (!formData.message) {
      Swal.fire("Warning", "Please enter your message.", "warning");
      return;
    }

    try {
      await axios.post("http://localhost:3001/pokemons/send-email", formData);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      Swal.fire("Good job!", "Email sent successfully!", "success");
      // window.alert("Email sent successfully");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to send email: ${error.message}`,
      });
      // window.alert("Failed to send email:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Overlay>
      <FormContainer>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <h2>Contact</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextArea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleInputChange}
          />
          <ButtonContainer>
            <SubmitButton type="submit">Submit</SubmitButton>
            <ResetButton type="button" onClick={handleReset}>
              <FaBroom title="Clean form" />
            </ResetButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </Overlay>
  );
};

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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 70%;
  max-width: 500px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: ${fadeIn} 0.8s ease;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  height: 25vh;
  background-color: #f5f5f5;
  color: black;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
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
    transform: translateY(3px);
  }
`;

const SubmitButton = styled(Button)`
  background-color: #375da4;
`;

const ResetButton = styled(Button)`
  background-color: #375da4;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
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
    transform: translateY(3px);
  }
`;

export default ContactForm;
