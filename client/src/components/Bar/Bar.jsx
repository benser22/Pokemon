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
  background-color: #4caf50;
  transition: width 1s ease;
  transform-origin: left center;
  transform: translateZ(0);
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.7);
  border: groove gray 1px;
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
    if (percentage >= 95) {
      return "#0e2e33";   
    } else if (percentage >= 90) {
      return "#005e7d"; 
    } else if (percentage >= 85) {
      return "#007b96"; 
    } else if (percentage >= 80) {
      return "#0094b9"; 
    } else if (percentage >= 75) {
      return "#00aedb"; 
    } else if (percentage >= 70) {
      return "#00bce4"; 
    } else if (percentage >= 65) {
      return "#00d6ff"; 
    } else if (percentage >= 60) {
      return "#0073e6"; 
    } else if (percentage >= 55) {
      return "#005ac3"; 
    } else if (percentage >= 50) {
      return "#ff4e41"; 
    } else if (percentage >= 45) {
      return "#ff744d"; 
    } else if (percentage >= 40) {
      return "#ff9659"; 
    } else if (percentage >= 35) {
      return "#ffb166"; 
    } else if (percentage >= 30) {
      return "#ffd17f"; 
    } else if (percentage >= 25) {
      return "#fdff95"; 
    } else if (percentage >= 20) {
      return "#e5ff91"; 
    } else if (percentage >= 15) {
      return "#caff96"; 
    } else if (percentage >= 10) {
      return "#b1ff9c"; 
    } else if (percentage >= 5) {
      return "#97ffa2";
    } else {
      return "#7cffa7";
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
