// Home.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPokemons, getTypes } from "../../redux/actions/actions";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";

const Home = () => {
  const pokemonsCreated = useSelector((state) => state.pokemons);
  const pokemonsApi = useSelector((state) => state.pokemonsApi);
  const allPokemons = [...pokemonsApi, ...pokemonsCreated];
  const allTypes = useSelector((state) => state.allTypes);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage);



  useEffect(() => {
    dispatch(getTypes()); // Lleno la base de datos con los Types cuando se inicia el programa, utilizando Redux
    dispatch(getAllPokemons()); // Traigo los pokemons de la Api también
  }, [dispatch]);

  const getType = (name) => {
    if (allTypes.length > 0) {
      const { image_type } = allTypes.find((t) => t.name === name);
      return image_type;
    }
    return;
  };

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!allPokemons && !allTypes) {
    return <h1>Loading...</h1>;
  }
  
  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  return (
    <div className={styles.container}>
      {allPokemons
        .slice(
          (currentPage - 1) * pokemonsPerPage,
          currentPage * pokemonsPerPage
        )
        .map((pokemon, index) => (
          <Card pokemon={pokemon} getType={getType} key={index} />
        ))}
      <div className={styles.buttonContainer}>
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
      </div>
    </div>
  );
};

export default Home;
