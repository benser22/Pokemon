import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../Modals/ConfirmationModal";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/3dhome.png";
import logo2 from "../../assets/images/logo.webp";
import SearchBar from "../SearchBar/SearchBar";
import { logoutAction } from "../../redux/actions/actions";
import DropdownMenu from "./DropdownMenu";
import { TYPES, ORDERS } from "../../constants/types";
import ResultSearch from "../ResultSearch/ResultSearch";

const Navbar = () => {
  const location = useLocation();
  const [logout, setLogout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchId, setSearchId] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderCurrent, setOrderCurrent] = useState("-");
  const [filterCurrent, setfilterCurrent] = useState("-");

  const orderByOptions = ["RESET", ...ORDERS];
  const filterByOptions = ["RESET", ...TYPES];

  useEffect(() => {
    if (searchId !== 0 || searchName !== "") {
      setOpenModal(true);
      handleClean();
    }
  }, [searchId, searchName]);

  const handleClean = () => {
    setSearchId(null);
    setSearchName(null);
  };

  useEffect(() => {
    // Si el usuario no está autenticado, redirigir a la página de inicio
    if (!user.access) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user, navigate]);

  const handleLogout = () => {
    setShowModal(true); // Muestro el modal de confirmación de cierre de sesión
  };

  useEffect(() => {
    if (logout) {
      navigate("/"); // Redirijo al usuario a la página de inicio cuando se realiza el cierre de sesión
      dispatch(logoutAction);
    }
    // eslint-disable-next-line
  }, [logout]);

  const closeModals = () => {
    setShowModal(false);
  };

  return (
    <nav className={styles.container}>
      <div className={styles.logos}>
        <Link to="/home">
          <img src={logo2} alt="logo" className={styles.logo2} />
          <img
            src={logo}
            alt="logo"
            className={styles.logo}
            title="Back to Home"
          />
        </Link>
      </div>
      <div className={styles.links}>
        <SearchBar setSearchId={setSearchId} setSearchName={setSearchName} />
      </div>
      <div className={styles.drop}>
        <DropdownMenu
          title="Order By"
          options={orderByOptions}
          setfilterCurrent={setfilterCurrent}
          setOrderCurrent={setOrderCurrent}
          choice={"order"}
        />
        <p className={`${styles.optionsLabel} ${styles.orderLabel}`}>
          {orderCurrent}
        </p>
        <DropdownMenu
          title="Filter By"
          options={filterByOptions}
          setfilterCurrent={setfilterCurrent}
          setOrderCurrent={setOrderCurrent}
          choice={"filter"}
        />
        <p className={`${styles.optionsLabel} ${styles.filterLabel}`}>
          {filterCurrent}
        </p>
      </div>
      <NavLink
        to={"/favorites"}
        className={`${styles.links} ${styles.favoritesLabel}`}
      >
        <p>Favorites</p>
      </NavLink>
      <NavLink to="/create" className={`${styles.links} ${styles.createLabel}`}>
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
          {user?.firstName}
        </p>
      </NavLink>
      {openModal && (
        <ResultSearch
          setOpenModal={setOpenModal}
        ></ResultSearch>
      )}
      {showModal && (
        <ConfirmationModal
          onClose={closeModals}
          setLogout={setLogout}
          logout={logout}
        />
      )}
    </nav>
  );
};

export default Navbar;
