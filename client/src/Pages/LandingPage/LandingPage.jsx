import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./LandingPage.module.css";
import desktopVideo from "../../assets/2022-03-12 22-14-18.mp4";
import mobileVideo from "../../assets/2022-03-12 22-14-18 (celular).mp4";
import ContactModal from "../../components/Modals/ContactModal";
import DescriptionModal from "../../components/Modals/DescriptionModal";
import banner from "../../assets/images/logo.webp";
import Form from "../../components/Form/Form";
import { saveUser } from "../../redux/actions/actions";

const LandingPage = () => {
  const isMobile = window.innerWidth <= 768;
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const userCurrent = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openContactModal = () => {
    setContactModalOpen(true);
  };

  const openDescriptionModal = () => {
    setDescriptionModalOpen(true);
  };

  const openLoginModal = () => {
    if (!userCurrent.email) {
      setLoginModalOpen(true);
    }
  };

  useEffect(() => {
    setUser(userCurrent);
  }, [userCurrent, user]);

  const closeModals = () => {
    setContactModalOpen(false);
    setDescriptionModalOpen(false);
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  const handleAccess = () => {
    if (userCurrent.access) {
      navigate("/home");
    } else {
      window.alert("You must log in");
    }
  };

  const handleLogout = () => {
    if (!userCurrent.email) {
      setRegisterModalOpen(true);
    } else {
      const take = window.confirm("Are you sure to sign out?");
      if (take) {
        dispatch(saveUser({}));
      }
    }
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
          Overview
        </div>
        <div
          className={styles.navItem}
          onClick={openContactModal}
          style={{ cursor: "pointer" }}
        >
          Contact
        </div>
        <div
          className={styles.navItem}
          onClick={openLoginModal}
          style={{ cursor: "pointer" }}
        >
          {!userCurrent.email ? <> Login </> : <>{userCurrent.email}</>}
        </div>
        <div
          className={styles.navItem}
          onClick={handleLogout}
          title="Sign out"
          style={{ cursor: "pointer", marginInline:"-5vh" }}
        >
          {userCurrent.email ? <>Logout</> : <>Sign-Up</>}
        </div>
      </div>
      <div className={styles.content}>
        <img src={banner} alt="Banner" className={styles.banner} />
        <h1 className={styles.title}>Welcome to the Pokemon App!</h1>
        <p className={styles.description}>Click the start button and enjoy</p>
        <button className={styles.getStartedButton} onClick={handleAccess}>
          Get Started
        </button>
      </div>
      {isContactModalOpen && <ContactModal onClose={closeModals} />}
      {isDescriptionModalOpen && <DescriptionModal onClose={closeModals} />}
      {isLoginModalOpen && <Form onClose={closeModals} setUser={setUser} newSesion={true} />}
      {isRegisterModalOpen && <Form onClose={closeModals} setUser={setUser} newSesion={false} />}
    </div>
  );
};

export default LandingPage;
