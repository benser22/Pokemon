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
import yellowStar from "../../assets/extras/yellowStar.png";
import whiteStar from "../../assets/extras/whiteStar.png";

export default function Card({
  pokemon,
  getType,
  setCurrentPage,
  numbersPokemons,
  currentPage,
}) {
  const dispatch = useDispatch();
  const formattedName = capitalizeFirstLetter(pokemon.name);
  const [isShinyCreated, setIsShinyCreated] = useState(false);
  const [isShiny, setIsShiny] = useState(pokemon.isShiny || false);
  const [isFavorite, setIsFavorite] = useState(false);
  const userCurrent = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const location = useLocation();
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
    if ((numbersPokemons - 1) % 12 === 0 && currentPage > 1) setCurrentPage(1);
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
      // me aseguro que si al sacar de favorites un pokemon  y era el único mostrado en la pagina, no este la pagina vacia
      dispatch(deleteFavoritesByUser(userCurrent.id, pokemon.name));
      //  dispatch(getFavoritesByUser(userCurrent.id));
      if ((numbersPokemons - 1) % 12 === 0 && currentPage > 1)
        setCurrentPage(1);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.cardContainer}>
      {/* Combine the card class with the background class> */}
      <div className={`${styles.card} ${getBackgroundImage()}`}>
        {/* Comienza mi cabecera */}
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
              id={`checkShiny${pokemon.name}`}
              type="checkbox"
              checked={isShiny}
              onChange={handleCheckboxShiny}
              className={styles.checkShiny}
            />
            <label
              htmlFor={`checkShiny${pokemon.name}`}
              className={styles.shiny}
            >
              Shiny
            </label>{" "}
            <div
              title={!isFavorite ? "Add to favorites" : "Remove to favorites"}
              style={{ height: "0" }}
            >
              <img
                src={isFavorite ? yellowStar : whiteStar}
                alt="Star"
                onClick={handleFavorite}
                className={styles.star}
              />
            </div>
          </div>
        </div>
        {/* termina mi cabecera y comienza el body de la carta */}
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
            style={{
              height: "max-content",
              width: "max-content",
            }}
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
