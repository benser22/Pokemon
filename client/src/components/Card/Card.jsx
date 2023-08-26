import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Card.module.css";
import logoDelete from "../../assets/close.png";
import {
  deleteFavoritesByUser,
  deletePokemon,
  postFavoritesByUser,
} from "../../redux/actions/actions";
import { NavLink, useLocation } from "react-router-dom";
import imgDefault from "../../assets/default.png";
import { Star } from "react-feather";

export default function Card({ pokemon, getType }) {
  const dispatch = useDispatch();
  const formattedName = capitalizeFirstLetter(pokemon.name);
  const [isShinyCreated, setIsShinyCreated] = useState(false);
  const [isShiny, setIsShiny] = useState(pokemon.isShiny || false);
  const [fillColor, setFillColor] = useState("white"); // Color de relleno inicial esttella
  const [isFavorite, setIsFavorite] = useState(false);
  const userCurrent = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const location = useLocation();

  // Verificar si la ruta actual es "/favorites/"
  const isFavoritesPage = location.pathname === "/favorites";

  useEffect(() => {
    const isPokemonFavorite = favorites.some(
      (favPokemon) => favPokemon.name === pokemon.name
    );
    setIsFavorite(isPokemonFavorite);
    // eslint-disable-next-line
  }, [pokemon]);

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
    if (!isFavorite && userCurrent) {
      dispatch(postFavoritesByUser(userCurrent.id, pokemon));
    } else {
      dispatch(deleteFavoritesByUser(userCurrent.id, pokemon.name));
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    isFavorite ? setFillColor("gold") : setFillColor("white");
  }, [isFavorite]);

  return (
    <div className={styles.cardContainer}>
      {/* Combine the card class with the background class> */}
      <div className={`${styles.card} ${getBackgroundImage()}`}>
      <div className={!isFavoritesPage ? styles.header : styles.favHeader}>
          {!isFavoritesPage && (
            <img
              src={logoDelete}
              alt="Delete"
              className={styles.deleteIcon}
              title="Delete Card"
              onClick={handleDelete}
            />
          )}
          {!isNaN(pokemon.id) ? (
            <p className={styles.ids}>#{pokemon.id}</p>
          ) : (
            <p className={styles.created}>#created</p>
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
              <div
                title={!isFavorite ? "Add to favorites" : "Remove to favorites"}
                style={{ height: "0" }}
              >
                <Star
                  size={26} // Cambia el tamaño del icono (en píxeles)
                  strokeWidth={2} // Cambia el ancho del contorno del icono (en unidades)
                  stroke="black" // Cambia el color del contorno del icono
                  fill={fillColor}
                  cursor="pointer" // Cambia el relleno del icono (en este caso, ninguno)
                  onClick={handleFavorite}
                  className={styles.star}
                />
              </div>
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
