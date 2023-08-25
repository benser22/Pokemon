// Home.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, getFavoritesByUser } from "../../redux/actions/actions";
import styles from "./Favorites.module.css";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader2";

const Favorites = () => {
  // const pokemonsCreated = useSelector((state) => state.pokemons);
  //   const pokemons = useSelector((state) => state.pokemons);
  const pokemons = useSelector((state) => state.favorites);
  const allTypes = useSelector((state) => state.allTypes);
  const userCurrent = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    // Solo dispatch si no tengo los datos en los archivos Redux
    if (!pokemons.length) {
      dispatch(getFavoritesByUser(userCurrent.id));
    }

    if (!allTypes.length) {
      dispatch(getTypes());
    }

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(loadingTimeout);
    // eslint-disable-next-line
  }, [pokemons.length, allTypes.length]);

  if (isLoading || !allTypes.length || !pokemons.length) {
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
      {pokemons
        .slice(
          (currentPage - 1) * pokemonsPerPage,
          currentPage * pokemonsPerPage
        )
        .map((pokemon, index) => (
          <Card pokemon={pokemon} getType={getType} key={index} />
        ))}
      <div className={styles.buttonContainer}>
        <button className={styles.pageButton} onClick={handlePrevPage}>
          {"<"}
        </button>
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
        <button className={styles.pageButton} onClick={handleNextPage}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Favorites;
