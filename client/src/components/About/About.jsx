import React from "react";
import profileImage from "../../assets/images/aboutme.webp";
import { NavLink } from "react-router-dom";

// Estilos
import styles from "./About.module.css";

// Algunos iconos predeterminados de react/fa
import { FaHome, FaLinkedin, FaGithub } from "react-icons/fa";

const About = () => {
  return (
    <div className={styles.aboutContainer} data-testid="about-component">
      <div className={styles.background} />
      <div className={styles.content}>
        <h2 className={styles.me}>About me</h2>
        <div className={styles.profileImageContainer}>
          <img
            src={profileImage}
            alt="Profile"
            className={styles.profileImage}
          />
        </div>
        <p className={styles.begin}>Hello! I'm Benjamin, a Henry student...</p>
        <p className={styles.description}>
          ...Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Accusantium nostrum sit neque dicta commodi atque facilis vitae nobis
          molestiae reprehenderit esse doloribus, totam asperiores laboriosam
          fuga quod? Delectus, ex neque!
        </p>
        <div>
          {/* Enlace a mi LinkedIn */}
          <a
            href="https://www.linkedin.com/in/benjam%C3%ADn-serrano-friedlander-30527b247/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <FaLinkedin />
          </a>
          {/* Enlace a mi GitHub */}
          <a
            href="https://github.com/benser22"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <FaGithub />
          </a>
        </div>
        <hr></hr>
        {/* Enlace a la página de inicio */}
        <NavLink to="/home" className={`${styles.navLink} ${styles.home}`} data-testid="home-link">
          <FaHome />
        </NavLink>
      </div>
    </div>
  );
};

export default About;
