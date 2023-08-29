import React, { useState } from "react";
import styles from "./DropdownMenu.module.css";
import { useDispatch } from "react-redux";
import { order } from "../../redux/actions/actions";

const DropdownMenu = ({ title, options, setOrderCurrent, setfilterCurrent}) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleItemClick = (option) => {
    if (!option.split(" ")[1]){
      const optionOrder = option.split(" ")[0];
      // dispatch(order(optionOrder));
      setfilterCurrent(optionOrder);
    } else {
      const optionOrder = option.split(" ")[0];
      const directionOrder = option.split(" ")[1];
      dispatch(order(optionOrder, directionOrder));
      setOrderCurrent(optionOrder + " " + directionOrder);
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
