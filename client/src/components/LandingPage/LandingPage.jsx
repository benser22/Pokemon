import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";
import desktopVideo from "../../assets/2022-03-12 22-14-18.mp4";
import mobileVideo from "../../assets/2022-03-12 22-14-18 (celular).mp4";
import ContactModal from "../Modals/ContactModal";
import DescriptionModal from "../Modals/DescriptionModal";
import banner from "../../assets/images/logo.webp";

const LandingPage = () => {
  const isMobile = window.innerWidth <= 768;
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);

  const openContactModal = () => {
    setContactModalOpen(true);
  };

  const openDescriptionModal = () => {
    setDescriptionModalOpen(true);
  };

  const closeModals = () => {
    setContactModalOpen(false);
    setDescriptionModalOpen(false);
  };

  return (
    <div className={styles.welcomeContainer}>
      <video
        className={styles.videoBackground}
        autoPlay
        muted
        loop
        id="backgroundVideo"
      >
        <source src={isMobile ? mobileVideo : desktopVideo} type="video/mp4" />
        Your browser does not support the video element.
      </video>
      <div className={styles.navbar}>
        <div
          className={styles.navItem}
          onClick={openDescriptionModal}
          style={{ cursor: "pointer" }}
        >
          What is it about
        </div>
        <div
          className={styles.navItem}
          onClick={openContactModal}
          style={{ cursor: "pointer" }}
        >
          Contact
        </div>
      </div>
      <div className={styles.content}>
        <img src={banner} alt="Banner" className={styles.banner} />
        <h1 className={styles.title}>Welcome to the Pokemon App!</h1>
        <p className={styles.description}>Click the start button and enjoy</p>
        <NavLink to="/home" className={styles.anchorLink}>
          <button className={styles.getStartedButton}>Get Started</button>
        </NavLink>
      </div>
      {isContactModalOpen && <ContactModal onClose={closeModals} />}
      {isDescriptionModalOpen && <DescriptionModal onClose={closeModals} />}
    </div>
  );
};

export default LandingPage;
