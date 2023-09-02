import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, getAccesUser } from "../../redux/actions/actions";
import MessageModal from "../Modals/MessageModal";
// Estilos
import styles from "./Form.module.css";

// Validación
import validate from "./validation";

// Imagen del logo
import logo from "../../assets/extras/login.webp";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

const Form = ({ onClose, newSesion }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [text, setText] = useState("");
  const [isModalMessage, setIsModalMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (text !== "") {
      setIsModalMessage(true);

      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line
  }, [text]);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    setErrors(
      validate({ ...userData, [event.target.name]: event.target.value })
    );
  };

  const handleRegister = async () => {
    const { email } = userData;
    const URL = "http://localhost:3001/pokemons";

    try {
      const response = await axios.post(`${URL}/register`, userData);

      if (response.status === 201) {
        loginForm(response);
        onClose();
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        if (status === 400) {
          setText("Error: you must complete all the fields to register");
        } else if (status === 409) {
          setText(
            `Error: there is already a user with ${email}, try another email`
          );
        } else {
          setText("An unknown error occurred.");
        }
      } else {
        setText("An error occurred while processing your request.");
      }
    }
  };

  const loginForm = async () => {
    const { email, password } = userData;
    try {
      const { data } = await axios.get(
        `http://localhost:3001/pokemons/login/${email}&${password}`
      );
      await dispatch(getAccesUser());

      if (data.user) {
        dispatch(login(data.user));
        onClose();
      }
    } catch (error) {
      if (error.request.status === 403) {
        setText("Password incorrect");
      } else if (error.request.status === 404) {
        setText("Email not registered");
      } else {
        setText(`${error.message}: The server doesn't respond`);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newSesion) {
      loginForm();
    } else {
      handleRegister();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <FaTimes className={styles.onClose} title="Close" onClick={onClose} />
        {newSesion && <img src={logo} alt="logo" className={styles.picture} />}
        {newSesion ? <h2>LOGIN</h2> : <h2>REGISTER</h2>}
        <form onSubmit={handleSubmit} data-testid="form-component">
          <hr
            style={{ color: "white", width: "100%", marginBottom: "6vh" }}
          ></hr>
          <div style={{ display: "none" }}>
            <label htmlFor="none"></label>
            <input id="none"></input>
          </div>
          {!newSesion && (
            <>
              <label htmlFor="myFN">First Name:</label>
              <input
                placeholder="First Name..."
                id="myFN"
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className={styles.myInput}
                autoComplete="First Name"
              />
              <p className={styles.error}>{errors.firstName}</p>
              <label htmlFor="myLN">Last Name:</label>
              <input
                placeholder="Last Name..."
                id="myLN"
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className={styles.myInput}
                autoComplete="Last Name"
              />
              {!errors.firstName && (
                <p className={styles.error}>{errors.lastName}</p>
              )}
            </>
          )}
          <label htmlFor="myMail">E-mail:</label>
          <input
            placeholder="example@example.com"
            id="myMail"
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className={styles.myInput}
            autoComplete="Email"
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}{" "}
          <label htmlFor="myPass">Password:</label>
          <div className={styles.passwordContaier}>
            <input
              id="myPass"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={handleChange}
              className={`${styles.passwordInput} ${styles.myInput}`}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className={styles.showPasswordButton}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <p id="spanform" className={styles.error}>
              {errors.password}
            </p>
          )}
          {newSesion ? (
            <button
              type="submit"
              value="LOGIN"
              id="submitL"
              className={styles.myButton}
            >
              SUBMIT
            </button>
          ) : (
            <button
              type="submit"
              value="REGISTER"
              id="submitR"
              className={styles.myButton}
            >
              SUBMIT
            </button>
          )}
        </form>
      </div>
      {isModalMessage && (
        <MessageModal onClose={onClose} message={text}></MessageModal>
      )}
    </div>
  );
};

export default Form;
