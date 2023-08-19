import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Error404.module.css";
import { FaHome } from "react-icons/fa";

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/error404")
    // eslint-disable-next-line
  }, []);

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div className={styles.error}>
      <h1 className={styles.myh1}>404</h1>
      <h2 className={styles.myh2}>Page not found</h2>
      <p className={styles.myp}>Sorry, the page you are looking for does not exist.</p>
      <button className={styles.mybutton} onClick={handleHomeClick} title="Back to Home">
        <FaHome />
      </button>
    </div>
  );
};

export default Error404;
