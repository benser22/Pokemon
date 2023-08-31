// Home.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllPokemons,
  getTypes,
  getFavoritesByUser,
  filterPokeCreated,
} from "../../redux/actions/actions";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader2";

const Home = () => {
  // const pokemonsCreated = useSelector((state) => state.pokemons);
  const pokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.allTypes);
  const orderOption = useSelector((state) => state.orderOption);
  const filterOption = useSelector((state) => state.filteredType);
  const created = useSelector((state) => state.created);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
  const [isLoading, setIsLoading] = useState(true);
  const userCurrent = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [pokemons]); // Se ejecuta cada vez que cambia la lista de pokémones

  //? Precargo los favoritos en la home para que se rendericen correctamente las estrellitas
  useEffect(() => {
    if (userCurrent.id && filterOption === "-" && orderOption === "-") {
      dispatch(getFavoritesByUser(userCurrent.id));
    }
    // eslint-disable-next-line
  }, []);

    //? Efecto para cargar todos los pokemones y los types asociados
  useEffect(() => {
    // Solo dispatch si no tengo los datos en los archivos Redux
    if (!pokemons.length && filterOption === "-" && orderOption === "-") {
      // if (!pokemons.length || (filterOption === "-" && orderOption === "-")) {
      dispatch(getAllPokemons());
    }

    if (allTypes.length === 0) {
      dispatch(getTypes());
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    // eslint-disable-next-line
  }, [pokemons.length]);

  
  useEffect(() => {
    // Si el usuario no está autenticado, redirigir a la página de inicio
    if (!userCurrent.access) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [userCurrent.access, navigate]);

  if (isLoading || !allTypes.length) {
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
    <div className={styles.container}>
      {pokemons.length && !isLoading &&
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
            }
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
