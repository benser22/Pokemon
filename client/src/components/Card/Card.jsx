import React from "react";
import styles from "./Card.module.css";

export default function Card({ pokemon, getType }) {
  const formattedName = capitalizeFirstLetter(pokemon.name);

  function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  return (
    <div className={styles.card}>
      <img
        src={pokemon.img}
        alt={pokemon.name}
        className={styles.pokemonImage}
      />
      <h2 className={styles.pokemonName}>{formattedName}</h2>
      <div className={styles.types}>
        {pokemon.types.map((type, index) => (
          <span key={index} className={styles.type}>
            <img src={getType(type)} alt={type} className={styles.typeImage} />
            <label className={styles.typeLabel}>{type.toUpperCase()}</label>
          </span>
        ))}
      </div>
    </div>
  );
}
