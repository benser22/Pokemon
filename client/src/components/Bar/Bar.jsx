import React, { useEffect } from "react";
import styled from "styled-components";

const StyledPokemonStats = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 2vh;
justify-content: center; /* Alinea los elementos verticalmente */
`;

const StyledStat = styled.div`
display: flex;
align-items: center;
margin-bottom: 4px; /* Aumenta el espacio entre elementos */
justify-content: space-between;
`;

const StatLabel = styled.div`
  font-size: 18px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: bold;
  letter-spacing: 0.1;
  flex: 1;
  margin-right: -1vh;
  margin-bottom: 0.5vh;
`;

const StatBar = styled.div`
  border-radius: 5px 5px 5px 5px;
  height: 20px;
  width: 0;
  transition: width 1s ease;
  transform-origin: left center;
  transform: translateZ(0);
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
  border: groove #4B6951 0.5px;
`;

const SpanValue = styled.span`
  font-size: 12px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: bold;
  margin-left: 1vh;
  letter-spacing: 0.1em;
`;

const Bar = ({ tag, value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  useEffect(() => {
    const animateBars = () => {
      const bars = document.querySelectorAll(`.${StatBar.styledComponentId}`);

      bars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        bar.style.width = `${width}%`;
        bar.style.backgroundColor = getBarColor(width);
      });
    };

    animateBars();
  }, []);

  const getBarColor = (percentage) => {
    if (percentage >= 90) {
      return "#ff0000"; 
    } else if (percentage >= 80) {
      return "#ff5757";  
    } else if (percentage >= 70) {
      return "#ffca18";   
    } else if (percentage >= 50) {
      return "#fff200";
    } else if (percentage >= 40) {
      return "#fff980";  
    } else if (percentage >= 35) {
      return "#0ed145";  
    } else if (percentage >= 30) {
      return "#88d99f";  
    } else if (percentage >= 25) {
      return "#c3c3c3";   
    } else if (percentage >= 20) {
      return "#e692e8";   
    } else if (percentage >= 15) {
      return "#2b00ff";  
    } else if (percentage >= 10) {
      return "#846bff";   
    } else if (percentage >= 5) {
      return "#c4b8ff";  
    } else {
      return "#8cfffb";  
    }
  };
  
  
  
  
  

  return (
    <StyledPokemonStats>
        <StatLabel>{tag}</StatLabel>
      <StyledStat>
        <StatBar data-width={percentage}></StatBar>
        <SpanValue>
          {value}/{maxValue}
        </SpanValue>
      </StyledStat>
    </StyledPokemonStats>
  );
};

export default Bar;
