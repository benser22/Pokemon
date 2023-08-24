import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Card.module.css";
import logoDelete from "../../assets/extras/delete.png";
import { deletePokemon } from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";
import imgDefault from "../../assets/default.png";

export default function Card({ pokemon, getType }) {
  const dispatch = useDispatch();
  const formattedName = capitalizeFirstLetter(pokemon.name);
  const [isShinyCreated, setIsShinyCreated] = useState(false);

  function capitalizeFirstLetter(input) {
    if (pokemon.name) {
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    }
  }
  const handleDelete = () => {
    dispatch(deletePokemon(pokemon.id));
  };

  const getBackgroundImage = () => {
    if (pokemon.types) {
      const firstType = pokemon.types[0]; // Get the first type from the array
      return styles[`${firstType}Background`]; // Use the CSS module to access the appropriate class
    }
  };

  const handleCheckboxShiny = () => {
    pokemon.isShiny = !pokemon.isShiny;
    setIsShinyCreated(!isShinyCreated);
  };

  return (
    <div className={styles.cardContainer}>
      <div
        className={`${styles.card} ${getBackgroundImage()}`} // Combine the card class with the background class
      >
        <div className={styles.groupShiny}>
          <label htmlFor="ckeckShiny" className={styles.shiny}>
            Shiny
          </label>
          <input
            type="checkbox"
            checked={isShinyCreated}
            onChange={handleCheckboxShiny}
            className={styles.checkShiny}
          />
        </div>
        <img
          src={logoDelete}
          alt="Delete"
          className={styles.deleteIcon}
          title="Delete Card"
          onClick={handleDelete}
        />
        <NavLink to={`/detail/${pokemon.id}`} className={styles.link}>
          {!isNaN(pokemon.id) ? (<p className={styles.ids}>#{pokemon.id}</p>) : (<p className={styles.ids}>#created</p>)}
            <h2 className={styles.pokemonName}>{formattedName}</h2>
        </NavLink>
        <img
          src={
            pokemon.isShiny && !pokemon.created && pokemon.imgShiny
              ? pokemon.imgShiny
              : pokemon.img
              ? pokemon.img
              : imgDefault
          }
          alt={pokemon.name}
          className={`${styles.pokemonImage} ${
            isShinyCreated && pokemon.created ? styles.createdImage : ""
          }`}
          id="ckeckShiny"
        />
        <div className={styles.types}>
          {pokemon.types?.map((type, index) => (
            <span key={index} className={styles.type}>
              <img
                src={getType(type)}
                alt={type}
                className={styles.typeImage}
              />
              <span className={styles.typeSpan}>{type.toUpperCase()}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
