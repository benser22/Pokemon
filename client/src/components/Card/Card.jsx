import React from "react";
import { useDispatch } from "react-redux";
import styles from "./Card.module.css";
import logoDelete from "../../assets/extras/delete.png";
import { deletePokemon } from "../../redux/actions/actions";

export default function Card({ pokemon, getType }) {
  const dispatch = useDispatch();
  const formattedName = capitalizeFirstLetter(pokemon.name);

  function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  const handleDelete = () => {
    dispatch(deletePokemon(pokemon.id));
  };

  const getBackgroundImage = () => {
    const firstType = pokemon.types[0]; // Get the first type from the array
    return styles[`${firstType}Background`]; // Use the CSS module to access the appropriate class
  };

  return (
    <div className={styles.cardContainer}>
      <div
        className={`${styles.card} ${getBackgroundImage()}`} // Combine the card class with the background class
      >
        <img
          src={logoDelete}
          alt="Delete"
          className={styles.deleteIcon}
          title="Delete Card"
          onClick={handleDelete}
        />
        <h2 className={styles.pokemonName}>{formattedName}</h2>
        <img
          src={pokemon.img}
          alt={pokemon.name}
          className={styles.pokemonImage}
        />
        <div className={styles.types}>
          {pokemon.types.map((type, index) => (
            <span key={index} className={styles.type}>
              <img
                src={getType(type)}
                alt={type}
                className={styles.typeImage}
              />
              <label className={styles.typeLabel}>{type.toUpperCase()}</label>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
