import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearStatePokemon, addPokemon } from "../../redux/actions/actions";
import closeIcon from "../../assets/close2.png";
import styles from "./ResultSearch.module.css";
import poke_angry from "../../assets/extras/poke_angry.gif";
import default_search from "../../assets/default_search.png";
import Bar from "../Bar/Bar";

function ResultSearch({ setOpenModal }) {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);
  const pokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.allTypes);
  const [condition, setCondition] = useState(true);

  useEffect(() => {
    const found = pokemons.some((pok) => pok.id === pokemon.id);
    if (found) {
      setCondition(false);
    } else {
      setCondition(true);
    }
  }, [pokemon, pokemons]);

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(clearStatePokemon());
  };

  function handleAdd() {
    dispatch(addPokemon(pokemon));
    handleCloseModal();
    dispatch(clearStatePokemon());
  }

  const getType = (name) => {
    if (allTypes.length > 0) {
      const { image_type } = allTypes.find((t) => t.name === name);
      return image_type;
    }
    return;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <img
          src={closeIcon}
          className={styles.FaTimes}
          alt="Close icon"
          title="Close"
          onClick={handleCloseModal}
          style={{width:"25px"}}
        ></img>
        {pokemon.name ? (
          <>
            {/* el id */}
            {pokemon.id >= 5000 ? (
              <span className={styles.pokemonId}>#{pokemon.id} (created)</span>
            ) : (
              <span className={styles.pokemonId}>#{pokemon.id}</span>
            )}
            {/* el name */}
            <p className={styles.pokemonName}>{pokemon.name.toUpperCase()}</p>
            {/* comienza la imagen y todas las barras */}
            <div className={styles.pokemonDetails}>
              <img
                src={pokemon.img ? pokemon.img : default_search}
                className={styles.pokemonImg}
                alt="Pokemon_IMG"
              ></img>
              <div className={styles.pokemonInfo}>
                <Bar tag={"Health Points"} value={pokemon.hp} maxValue={255} />
                <Bar tag={"Attack"} value={pokemon.attack} maxValue={255} />
                <Bar tag={"Defense"} value={pokemon.defense} maxValue={255} />
                <Bar tag={"Speed"} value={pokemon.speed} maxValue={255} />
                <Bar
                  tag={"Height (mts)"}
                  value={pokemon.height}
                  maxValue={20}
                />
                <Bar
                  tag={"Weight (kgs)"}
                  value={pokemon.weight}
                  maxValue={1000}
                />
              </div>
            </div>
            {/* el footer con los types */}
            <div className={styles.footer}>
              {pokemon.types?.map((type, index) => (
                <div key={index} className={styles.type}>
                  <img
                    src={getType(type)}
                    alt={type}
                    className={styles.typeImage}
                  />
                  <span className={styles.typeSpan}>{type.toUpperCase()}</span>
                </div>
              ))}
            </div>
            {/* boton de agregar a la pokedex si es que no tengo ese pokemon encontrado */}
            <button
              className={styles.buttonAdd}
              title="Add pokemon to your Pokedex"
              disabled={!condition}
              onClick={handleAdd}
            >
              Add Pokemon
            </button>
          </>
        ) : (
          <>
            {/* modal de pokemon no encontrado */}
            <img
              src={poke_angry}
              alt="poke_angry"
              className={styles.pokesad}
            ></img>
            <h5 className={styles.pokesadh5}>Oops! Pokémon not found!</h5>
          </>
        )}
      </div>
    </div>
  );
}

export default ResultSearch;
