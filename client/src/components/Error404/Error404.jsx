import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Error404.module.css";
import { FaHome } from "react-icons/fa";

const Error404 = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div className={styles.error} data-testid="error404-component">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <button onClick={handleHomeClick}>
        <FaHome />
      </button>
    </div>
  );
};

export default Error404;
