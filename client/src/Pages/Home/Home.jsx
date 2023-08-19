// Home.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPokemons, getTypes } from "../../redux/actions/actions";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader2";

const Home = () => {
  const pokemonsCreated = useSelector((state) => state.pokemons);
  const pokemonsApi = useSelector((state) => state.pokemonsApi);
  const allPokemons = [...pokemonsApi, ...pokemonsCreated];
  const allTypes = useSelector((state) => state.allTypes);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    // Solo dispatch si no tengo los datos en los archivos Redux
    if (!allPokemons.length) {
      dispatch(getAllPokemons());
    }

    if (!allTypes.length) {
      dispatch(getTypes());
    }

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, [dispatch, allPokemons.length, allTypes.length]);

  if (isLoading) {
    return <Loader />;
  }

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
