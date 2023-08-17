// Home.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPokemons, getTypes } from "../../redux/actions/actions";
import styles from "./Home.module.css";

const Home = () => {
  const pokemonsCreated = useSelector((state) => state.pokemons);
  const pokemonsApi = useSelector((state) => state.pokemonsApi);
  const allPokemons = [...pokemonsApi, ...pokemonsCreated];

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage);

  useEffect(() => {
    dispatch(getTypes()); // Lleno la base de datos con los Types cuando se inicia el programa, utilizando Redux
    dispatch(getAllPokemons()); // Traigo los pokemons de la Api también
  }, [dispatch]);

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Estoy en Home</h1>
      <h3 className={styles.subtitle}>Pokémons:</h3>
      <ul className={styles.pokemonList}>
        {/* Renderizar los pokémons de la página actual */}
        {allPokemons
          .slice(
            (currentPage - 1) * pokemonsPerPage,
            currentPage * pokemonsPerPage
          )
          .map((pokemon, index) => (
            <li key={index}>{pokemon.name}</li>
          ))}
      </ul>
      <div className={styles.buttonContainer}>
        {currentPage > 1 && (
          <button className={styles.buttonL} onClick={handlePrevPage}>
            Previous
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.currentPageButton : ""
            }`}
            onClick={() => handleChangePage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button className={styles.buttonR} onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
