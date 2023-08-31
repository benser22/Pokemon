import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/pokeBall.gif";
import SearchBar from "../SearchBar/SearchBar";
import { logoutAction } from "../../redux/actions/actions";
import DropdownMenu from "./DropdownMenu";
import { TYPES, ORDERS } from "../../constants/types";

const Navbar = () => {
  const location = useLocation();
  const [logout, setLogout] = useState(false); // Estado para controlar si se ha realizado el cierre de sesión
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const userCurrent = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderCurrent, setOrderCurrent] = useState("-");
  const [filterCurrent, setfilterCurrent] = useState("-");

  const orderByOptions = ["RESET", ...ORDERS];
  const filterByOptions = ["RESET", ...TYPES];

  const handleLogout = () => {
    setShowModal(true); // Muestro el modal de confirmación de cierre de sesión
  };

  const handleConfirmLogout = () => {
    setLogout(true); // Actualizo el estado de 'logout' para indicar que se ha realizado el cierre de sesión
    setShowModal(false); // Oculto el modal de confirmación de cierre de sesión
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (logout) {
      navigate("/"); // Redirijo al usuario a la página de inicio cuando se realiza el cierre de sesión
    }
    // eslint-disable-next-line
  }, [logout]);

  return (
    <nav className={styles.container}>
      <div>
        <Link to="/home" title="Back to Home">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.links}>
        <SearchBar></SearchBar>
      </div>
      <div style={{display:"flex", width:"30%", alignItems:"center"}}>
          <DropdownMenu
            title="Order By"
            options={orderByOptions}
            setfilterCurrent={setfilterCurrent}
            setOrderCurrent={setOrderCurrent}
            choice={"order"}
          />
          <p className={styles.optionsLabel} style={{padding:"5vh", width:"30%", marginLeft:"-35vh"}}>{orderCurrent}</p>
          <DropdownMenu
            title="Filter By"
            options={filterByOptions}
            setfilterCurrent={setfilterCurrent}
            setOrderCurrent={setOrderCurrent}
            choice={"filter"}
          />
          <p className={styles.optionsLabel} style={{marginLeft:"-22vh"}}>{filterCurrent}</p>
      </div>
      <NavLink
        to={"/favorites"}
        className={styles.links}
        style={{ textDecoration: "none", marginLeft: "-20vh" }}
      >
        <p>Favorites</p>
      </NavLink>
      <NavLink to="/create" style={{ textDecoration: "none", color: "black" }}>
        <div className={styles.links}>
          <p>Create</p>
        </div>
      </NavLink>
      <NavLink
        to={logout ? "/" : location}
        style={{ textDecoration: "none" }}
        onClick={handleLogout}
      >
        <p
          title="Logout"
          className={styles.logout}
          style={{ marginRight: "5vh" }}
        >
          {userCurrent?.firstName}
        </p>
      </NavLink>
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
