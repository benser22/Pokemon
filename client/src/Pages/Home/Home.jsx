// Home.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPokemons,
  getTypes,
  getFavoritesByUser,
  filterPokeCreated,
} from "../../redux/actions/actions";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader2";

const Home = ({ noTesting = true }) => {
  const pokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.allTypes);
  const orderOption = useSelector((state) => state.orderOption);
  const filterOption = useSelector((state) => state.filteredType);
  const created = useSelector((state) => state.created);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
  const [isLoading, setIsLoading] = useState(noTesting);
  const userCurrent = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //? Efecto para precargar las imagenes, mejorando el UX
  useEffect(() => {
    // Precarga de las imágenes
    pokemons.map((pokemon) => {
      return new Promise((resolve) => {
        const img = new Image(); // Crea un objeto de imagen
        img.src = pokemon.img; // Establece la fuente de la imagen

        // Configura el evento onload que se ejecutará cuando la imagen se cargue
        img.onload = () => {
          resolve(); // Resuelve la promesa cuando la imagen se carga. Cuando se llama a resolve(), la promesa se considera resuelta exitosamente.
        };
      });
    });
  }, [pokemons]);

  //? Precargo los favoritos en la home para que se rendericen correctamente las estrellitas
  useEffect(() => {
    if (userCurrent.id && filterOption === "-" && orderOption === "-") {
      dispatch(getFavoritesByUser(userCurrent.id));
    }
    // eslint-disable-next-line
  }, []);

  //? Efecto para cargar todos los pokemones y los types asociados
  useEffect(() => {
    let loadingTimeout;

    // Solo dispatch si no tengo los datos en los archivos Redux
    if (!pokemons.length && filterOption === "-" && orderOption === "-") {
      dispatch(getAllPokemons());
    }

    if (allTypes.length === 0) {
      dispatch(getTypes());
    }

    // Comprueba si ya tienes algunos datos cargados en pokemons
    if (pokemons.length > 0) {
      setIsLoading(false);
    } else {
      // Si no se cargaron datos en pokemons, establece isLoading en falso después de 1.8 segundos.
      loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1800);
    }

    // Limpia el temporizador si el componente se desmonta antes de que expire
    return () => clearTimeout(loadingTimeout);

    // eslint-disable-next-line
  }, []);

  if (noTesting && (isLoading || !allTypes.length)) {
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
    dispatch(filterPokeCreated(!created));
    setCurrentPage(1);
  };

  return (
    <div className={styles.container} data-testid="home-component">
      {pokemons.length && !isLoading ? (
        pokemons
          .slice(
            (currentPage - 1) * pokemonsPerPage,
            currentPage * pokemonsPerPage
          )
          .map((pokemon, index) => (
            <Card
              pokemon={pokemon}
              getType={getType}
              key={index}
              setCurrentPage={setCurrentPage}
              numbersPokemons={pokemons.length}
              currentPage={currentPage}
            />
          ))
      ) : (
        <div className={styles.imgNothing}>
          <h2 className={styles.textNothing}>Nothing to see here!</h2>
        </div>
      )}

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
            checked={created}
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
