import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./LandingPage.module.css";
import desktopVideo from "../../assets/2022-03-12 22-14-18.mp4";
import mobileVideo from "../../assets/2022-03-12 22-14-18 (celular).mp4";
import ContactModal from "../../components/Modals/ContactModal";
import DescriptionModal from "../../components/Modals/DescriptionModal";
import MessageModal from "../../components/Modals/MessageModal";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import banner from "../../assets/images/logo.webp";
import Form from "../../components/Form/Form";
import { getAccesUser } from "../../redux/actions/actions";

const LandingPage = () => {
  const isMobile = window.innerWidth <= 768;
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isMessage, setMessageOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const userCurrent = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const rol = useSelector((state) => state.user.rol);

  useEffect(() => {
    if (!rol) dispatch(getAccesUser());
    // eslint-disable-next-line
  }, [user.access]);

  const openContactModal = () => {
    setContactModalOpen(true);
  };

  const openDescriptionModal = () => {
    setDescriptionModalOpen(true);
  };

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const openLoginModal = () => {
    if (!user?.email) {
      setLoginModalOpen(true);
    }
  };

  const closeModals = () => {
    setContactModalOpen(false);
    setDescriptionModalOpen(false);
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
    setMessageOpen(false);
    setConfirmationModalOpen(false);
  };

  const handleAccess = () => {
    if (user?.email) {
      navigate("/home");
    } else {
      setMessageOpen(true);
    }
  };

  const handleLogout = () => {
    if (!user?.email) {
      setRegisterModalOpen(true);
    } else {
      openConfirmationModal();
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
          {!user?.email ? (
            <> Login </>
          ) : (
            <>
              {userCurrent.email} ({rol})
            </>
          )}
        </div>
        <div
          className={styles.navItem}
          onClick={handleLogout}
          title="Sign out"
          style={{ cursor: "pointer", marginInline: "-5vh" }}
        >
          {/* {userCurrent.email ? <>Logout</> : <>Sign-Up</>} */}
          {user?.email ? <>Logout</> : <>Sign-Up</>}
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
      {isLoginModalOpen && <Form onClose={closeModals} newSesion={true} />}
      {isRegisterModalOpen && <Form onClose={closeModals} newSesion={false} />}
      {isMessage && (
        <MessageModal
          onClose={closeModals}
          message={"Please log in to access the application"}
        />
      )}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          onClose={closeModals}
          setLogout={setLogout}
          logout={logout}
        />
      )}
    </div>
  );
};

export default LandingPage;
