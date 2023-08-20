import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
// import { useDispatch } from 'react-redux';
import logo from "../../assets/images/pokeBall.gif";
import Modal from "react-modal";

const Navbar = () => {
  const location = useLocation();
  const [logout, setLogout] = useState(false); // Estado para controlar si se ha realizado el cierre de sesión
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const handleReset = () => {
  // dispatch(restorePokemons());
  // };


  const handleLogout = () => {
    setShowModal(true); // Muestro el modal de confirmación de cierre de sesión
  };

  const handleConfirmLogout = () => {
    setLogout(true); // Actualizo el estado de 'logout' para indicar que se ha realizado el cierre de sesión
    setShowModal(false); // Oculto el modal de confirmación de cierre de sesión
  };

  useEffect(() => {
    if (logout) {
      navigate("/"); // Redirijo al usuario a la página de inicio cuando se realiza el cierre de sesión
    }
  }, [logout, navigate]);

  return (
    <nav className={styles.container}>
      <div>
        <Link to="/home" title="Back to Home">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>
      </div>
      <Link to="/pokemons" style={{ textDecoration: "none", color: "black" }}>
        <div className={styles.links}>
          <p>.............</p>
        </div>
      </Link>
      <Link to="/create" style={{ textDecoration: "none", color: "black" }}>
        <div className={styles.links}>
          <p>Create</p>
        </div>
      </Link>
      <Link
        to={logout ? "/" : location}
        style={{ textDecoration: "none" }}
        onClick={handleLogout}
      >
        <p className={styles.logout}>Logout</p>
      </Link>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Confirm Logout"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        appElement={document.getElementById("root")}
      >
        <h2 className={styles.myh2}>Confirm Logout</h2>
        <hr
          style={{
            width: "100%",
            boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          }}
        ></hr>
        <p
          style={{
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: "14px",
          }}
        >
          Are you sure you want to log out?
        </p>
        <button style={{ fontSize: "14px" }} onClick={handleConfirmLogout}>
          Logout
        </button>
        <button
          style={{ fontSize: "14px" }}
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </Modal>
    </nav>
  );
};

export default Navbar;
