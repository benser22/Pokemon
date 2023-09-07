import React, { useEffect, useState } from "react";
import styles from "./DropdownMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filter, order } from "../../redux/actions/actions";

const DropdownMenu = ({
  title,
  options,
  setOrderCurrent,
  setfilterCurrent,
  choice,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const filterLabel = useSelector((state) => state.filteredType);
  const orderLabel = useSelector((state) => state.orderOption);
  const directionLabel = useSelector((state) => state.orderDirection);

  useEffect(() => {
    setOrderCurrent(orderLabel + " " + directionLabel);
    setfilterCurrent(filterLabel);
  }, [
    setfilterCurrent,
    setOrderCurrent,
    filterLabel,
    orderLabel,
    directionLabel,
  ]);

  const handleItemClick = (option) => {
    if (choice === "filter") {
      const optionFilter = option.split(" ")[0];
      dispatch(filter(optionFilter));
    } else {
      const optionOrder = option.split(" ")[0];
      const directionOrder = option.split(" ")[1] || " ";
      dispatch(order(optionOrder, directionOrder));
    }
  };

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className={styles[`${title.split(" ")[0]}`]}>{title}</p>
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
