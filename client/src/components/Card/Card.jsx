import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Card.module.css";
import logoDelete from "../../assets/close.png";
import { deletePokemon } from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";
import imgDefault from "../../assets/default.png";
import star from "../../assets/types/bug.png";
import { Star } from "react-feather";

export default function Card({ pokemon, getType }) {
  const dispatch = useDispatch();
  const formattedName = capitalizeFirstLetter(pokemon.name);
  const [isShinyCreated, setIsShinyCreated] = useState(false);
  const [isShiny, setIsShiny] = useState(pokemon.isShiny || false);
  const [fillColor, setFillColor] = useState("white"); // Color de relleno inicial esttella
  const [isFavorite, setIsFavorite] = useState(false);

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
      const firstType = pokemon.types[0];
      return styles[`${firstType}Background`];
    }
  };

  const handleCheckboxShiny = () => {
    const newIsShiny = !pokemon.isShiny;
    setIsShinyCreated(!isShinyCreated);
    setIsShiny(newIsShiny);
    pokemon.isShiny = newIsShiny;
  };

  useEffect(() => {
    setIsShiny(pokemon.isShiny || false);
  }, [pokemon.isShiny]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    isFavorite ? setFillColor("gold") : setFillColor("white");
  }, [isFavorite]);

  return (
    <div className={styles.cardContainer}>
      {/* Combine the card class with the background class> */}
      <div className={`${styles.card} ${getBackgroundImage()}`}>
        <div className={styles.header}>
          <img
            src={logoDelete}
            alt="Delete"
            className={styles.deleteIcon}
            title="Delete Card"
            onClick={handleDelete}
          />
          {!isNaN(pokemon.id) ? (
            <p className={styles.ids}>#{pokemon.id}</p>
          ) : (
            <p className={styles.ids}>#created</p>
          )}
          <div className={styles.groupShiny}>
            <input
              id="ckeckShiny"
              type="checkbox"
              checked={isShiny}
              onChange={handleCheckboxShiny}
              className={styles.checkShiny}
            />
            <label htmlFor="ckeckShiny" className={styles.shiny}>
              Shiny
            </label>
            {/* <Star className={styles.star} alt="star_image"></Star> */}
             <div title={!isFavorite ? "Add to favorites" : "Remove to favorites"} style={{height:"0"}}>
            <Star
              size={18} // Cambia el tamaño del icono (en píxeles)
              // color="yellow"     // Cambia el color del icono (utiliza nombres de colores o códigos hexadecimales)
              strokeWidth={2} // Cambia el ancho del contorno del icono (en unidades)
              stroke="black" // Cambia el color del contorno del icono
              fill={fillColor}
              cursor="pointer" // Cambia el relleno del icono (en este caso, ninguno)
              onClick={handleFavorite}
              className={styles.star}
              />
              </div>
            {/* src={star} */}
          </div>
        </div>
        {/* termina header */}
        <div className={styles.body}>
          <NavLink to={`/detail/${pokemon.id}`} className={styles.link}>
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
            id="img"
          />
        </div>
        {/* Termina body */}
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
