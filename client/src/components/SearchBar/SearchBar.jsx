import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonByName,
  getPokemonById,
  clearStatePokemon,
} from "../../redux/actions/actions";
import styles from "./SearchBar.module.css";
import Modal from "react-modal";
import poke_angry from "../../assets/extras/poke_angry.gif";

/*Configurar el elemento raíz en react-modal asegura la accesibilidad (p/usuarios que la necesiten) y evita warning por consola*/
const appElement = document.getElementById("root");
Modal.setAppElement(appElement);

export default function SearchBar() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imgPoke, setImgPoke] = useState(false);

  function closeModal() {
    setShowModal(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanedInput = input.trim().toLowerCase();
    if (!cleanedInput) {
      setImgPoke(false);
      setErrorMessage("Name or Id required");
      setShowModal(true);
      return;
    }

    try {
      if (!isNaN(cleanedInput)) {
        await dispatch(getPokemonById(cleanedInput));
      } else {
        await dispatch(getPokemonByName(cleanedInput));
      }
      dispatch(clearStatePokemon());
    } catch (error) {
      setImgPoke(true);
      setErrorMessage("Pokemon not found");
      setShowModal(true);
    }
    setInput("");
  }

  console.log(pokemon);
  return (
    <div className={styles.searchBox}>
      <div className={styles.searchAdd}>
        <form className={styles.searchAddForm} onSubmit={handleSubmit}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Pokemon name or id..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className={styles.searchBarBtns}>
            Search Card
          </button>
        </form>
      </div>
      {showModal && (
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          contentLabel="Error Modal"
          className={`${!imgPoke ? styles.modalContent1 : styles.modalContent}`}
          overlayClassName={styles.modalOverlay}
        >
          <button className={styles.closeModalBtn} onClick={closeModal}>
            Close
          </button>
          <p className={styles.modalMessage}>{errorMessage}</p>
          {imgPoke && (
            <img
              src={poke_angry}
              alt="poke_angry"
              className={styles.pokesad}
            ></img>
          )}
        </Modal>
      )}
    </div>
  );
}
