import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotationBack = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
`;

const LoaderContainer = styled.div`
  width: 24px;
  height: 24px;
  background: #353535;
  display: block;
  margin: 20px auto;
  position: relative;
  box-sizing: border-box;
  animation: ${rotationBack} 1s ease-in-out infinite reverse;
`;

const LoaderBefore = styled.div`
  content: '';
  box-sizing: border-box;
  left: 0;
  top: 0;
  transform: rotate(45deg);
  position: absolute;
  width: 24px;
  height: 24px;
  background: #2e2e2e;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
`;

const LoaderAfter = styled.div`
  content: '';
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  background: rgb(0, 0, 0);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
`;

const Myh3 = styled.h3`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  margin-bottom: 4px;
  padding: 6px;
`;

const Loader = () => {
  return (
    <>
    <Myh3>Loading...</Myh3>
    <LoaderContainer>
      <LoaderBefore />
      <LoaderAfter />
    </LoaderContainer>
    </>
  );
};

export default Loader;
