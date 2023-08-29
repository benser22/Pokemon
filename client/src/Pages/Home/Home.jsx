// Home.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllPokemons,
  getTypes,
  getFavoritesByUser,
  filterPokeCreated
} from "../../redux/actions/actions";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader2";

const Home = () => {
  // const pokemonsCreated = useSelector((state) => state.pokemons);
  const pokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.allTypes);
  const favorites = useSelector((state) => state.favorites);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
  const [isLoading, setIsLoading] = useState(true);
  const [viewFiltered, setViewFiltered] = useState(false);
  const userCurrent = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Precarga de las imágenes
  useEffect(() => {
    let mounted = true;

    const imagePromises = pokemons.map((pokemon) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = pokemon.img;
        img.onload = () => {
          resolve();
        };
      });
    });

    Promise.all(imagePromises).then(() => {
      if (mounted) {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, [pokemons]);

  // Precargo los favoritos en la home para que se rendericen correctamente las estrellitas
  useEffect(() => {
    if (favorites.length === 0 && userCurrent) {
      dispatch(getFavoritesByUser(userCurrent.id));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Solo dispatch si no tengo los datos en los archivos Redux
    if (pokemons.length === 0) {
      dispatch(getAllPokemons());
    }

    if (allTypes.length === 0) {
      dispatch(getTypes());
    }

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(loadingTimeout);
    // eslint-disable-next-line
  }, [pokemons]);

  useEffect(() => {
  dispatch(filterPokeCreated(viewFiltered));
  setCurrentPage(1);
  // eslint-disable-next-line
  }, [viewFiltered]);

  useEffect(() => {
    // Si el usuario no está autenticado, redirigir a la página de inicio
    if (!userCurrent.access) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [userCurrent.access, navigate]);


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

  const handleFilter = () => {
    setViewFiltered(!viewFiltered);
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
        <div className={styles.viewCreated}>
          <label htmlFor="labelfiltercreated" className={styles.labelView}>
            Show only created
          </label>
          <input
            id="labelfiltercreated"
            className={styles.checkView}
            type="checkbox"
            title="Only created"
            checked={viewFiltered}
            onChange={handleFilter}
          />
        </div>
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

export default Home;
