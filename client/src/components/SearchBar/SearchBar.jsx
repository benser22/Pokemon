import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getPokemonByName,getPokemonById,clearStatePokemon, addPokemon} from "../../redux/actions/actions";
import styles from "./SearchBar.module.css";
import Modal from "react-modal";
import poke_angry from "../../assets/extras/poke_angry.gif";
import { FaTimes } from "react-icons/fa";
/*Configurar el elemento raíz en react-modal asegura la accesibilidad (p/usuarios que la necesiten) y evita warning por consola*/
const appElement = document.getElementById("root");
Modal.setAppElement(appElement);

export default function SearchBar() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);
  const allTypes = useSelector((state) => state.allTypes);
  const pokemons = useSelector((state) => state.pokemons);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imgPoke, setImgPoke] = useState(false);
  const [info, setInfo] = useState(false);
  const [condition, setCondition] = useState(true);

  useEffect(() => {
    const found = pokemons.some((pok) => pok.id === pokemon.id);
    if (found) {
      setCondition(false);
    } else {
      setCondition(true);
    }
  }, [pokemon, pokemons]);

  const getType = (name) => {
    if (allTypes.length > 0) {
      const { image_type } = allTypes.find((t) => t.name === name);
      return image_type;
    }
    return;
  };

  function closeModal() {
    setShowModal(false);
  }

  function handleAdd(){
  dispatch(addPokemon(pokemon));
  closeModal();
  dispatch(clearStatePokemon())
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanedInput = input.trim().toLowerCase();
    if (!cleanedInput) {
      setImgPoke(false);
      setErrorMessage("Name or Id required");
      setShowModal(true);
      setInfo(false);
      return;
    }

    try {
      if (!isNaN(cleanedInput)) {
        await dispatch(getPokemonById(cleanedInput));
        setInfo(true);
        setShowModal(true);
      } else {
        await dispatch(getPokemonByName(cleanedInput));
        setInfo(true);
        setShowModal(true);
      }
      return setInput("");
    } catch (error) {
      setImgPoke(true);
      setErrorMessage("Pokemon not found");
      setShowModal(true);
      setInfo(false);
      return setInput("");
    }
  }
  useEffect(() => {
    if (!showModal) {
      dispatch(clearStatePokemon());
    }
  }, [showModal, dispatch]);

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
          {!info && imgPoke && (
            <img
              src={poke_angry}
              alt="poke_angry"
              className={styles.pokesad}
            ></img>
          )}
          {!info && <p className={styles.modalMessage}>{errorMessage}</p>}
          {info && (
            <>
              <div className={styles.headerModal}>
                {info && (
                  <FaTimes
                    className={styles.FaTimes}
                    title="Close"
                    onClick={closeModal}
                  ></FaTimes>
                )}
                {!isNaN(pokemon.id) ? (
                  <span>#{pokemon.id}</span>
                ) : (
                  <span>#created</span>
                )}
              </div>
              {pokemon.name && (<p className={styles.pokemonName}>{pokemon.name.toUpperCase()}</p>)}
              <div className={styles.pokemonDetails}>
                <img
                  src={pokemon.img}
                  className={styles.pokemonImg}
                  alt="Pokemon_IMG"
                ></img>
                <div className={styles.pokemonInfo}>
                  <p>Health Points: {pokemon.hp}</p>
                  <p>Attack: {pokemon.attack}</p>
                  <p>Speed: {pokemon.speed}</p>
                  <p>Defense: {pokemon.defense}</p>
                  <p>Height: {pokemon.height}</p>
                  <p>Weight: {pokemon.weight}</p>
                  <button
                    className={styles.buttonAdd}
                    title="Add pokemon to your pokedex"
                    disabled={!condition}
                    onClick={handleAdd}
                  >
                    Add Pokemon
                  </button>
                </div>
                <div className={styles.types}>
                  <p className={styles.titleTypes}>Types</p>
                  {pokemon.types?.map((type, index) => (
                    <span key={index} className={styles.type}>
                      <img
                        src={getType(type)}
                        alt={type}
                        className={styles.typeImage}
                      />
                      <span className={styles.typeSpan}>
                        {type.toUpperCase()}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
          {!info && (
            <button className={styles.closeModalBtn} onClick={closeModal}>
              Close
            </button>
          )}
        </Modal>
      )}
    </div>
  );
}
