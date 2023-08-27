import React, { useState } from "react";
import styles from "./DropdownMenu.module.css";

const DropdownMenu = ({ title, options }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleItemClick = (option) => {
    if (!option.split(" ")[1]){
      console.log("hago un dispatch de filter", option.split(" ")[0]);
    } else {
      console.log("hago un dispatch de order", option.split(" ")[0], " pasando como parametro: ", option.split(" ")[1]);
    }
  };

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p>{title}</p>
      {isHovered && (
        <div className={styles.dropdownContent}>
          {options.map((option, index) => (
            <p key={index} onClick={() => handleItemClick(option)}>
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
