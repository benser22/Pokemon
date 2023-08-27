import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/actions/actions";
import axios from "axios";
import MessageModal from "../Modals/MessageModal";
// Estilos
import styles from "./Form.module.css";

// Validación
import validate from "./validation";

// Imagen del logo
import logo from "../../assets/extras/login.webp";
import { FaTimes } from "react-icons/fa";

const Form = ({ onClose, setUser, newSesion }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [text, setText] = useState("");
  const [isModalMessage, setIsModalMessage] = useState(false);

  useEffect(() => {
    if (text !== "") {
      setIsModalMessage(true);
    }
    // eslint-disable-next-line
  }, [text]);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    setErrors(
      validate({ ...userData, [event.target.name]: event.target.value })
    );
  };

  const login = async () => {
    const { email, password } = userData;
    const URL = `http://localhost:3001/pokemons/login/${email}&${password}`;
    try {
      const { data } = await axios.get(URL);

      if (data) {
        dispatch(saveUser(data));
        setUser(data);
        onClose();
      }
    } catch (error) {
      console.log(error.message);
      if (error.request.status === 403) {
        setText("Password incorrect");
      } else if (error.request.status === 404) {
        setText("Email not registered");
      } else {
        setText(`${error.message}: The server doesn't respond`);
      }
    }
  };

  const handleRegister = async () => {
    const { email, password, firstName, lastName } = userData;
    const URL = "http://localhost:3001/pokemons/login/";
    try {
      const response = await axios.post(URL, userData);
      if (response.status === 201) {
        setUserData({
          email,
          password,
          firstName,
          lastName,
        });
        setText(
          `Congratulation ${firstName}: you successfully registered with the email ${email}`
        );
      } else if (response.status === 200) {
        setText(`Error: there is already a user with ${email}, try another email`);
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      if (error.request.status === 400)
        setText("Error: you must complete all the fields to register");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newSesion) {
      login();
    } else {
      handleRegister();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {newSesion && <img src={logo} alt="logo" className={styles.picture} />}
        {newSesion ? <h2>LOGIN</h2> : <h2>REGISTER</h2>}
        <form onSubmit={handleSubmit}>
          <hr
            style={{ color: "white", width: "100%", marginBottom: "6vh" }}
          ></hr>
          <div style={{display:"none"}}>
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
          {!errors.firstName && !errors.lastName && (
            <p className={styles.error}>{errors.email}</p>
          )}{" "}
          <label htmlFor="myPass">Password:</label>
          <input
            id="myPass"
            autoComplete="current-password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className={styles.myInput}
          />
          {!errors.email && (
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
        <FaTimes className={styles.close} title="Close" onClick={onClose} />
      </div>
      {isModalMessage && (
        <MessageModal onClose={onClose} message={text}></MessageModal>
      )}
    </div>
  );
};

export default Form;
