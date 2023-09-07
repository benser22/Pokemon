import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Favorites.module.css";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader2";
import { filterPokeCreated } from "../../redux/actions/actions";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const allTypes = useSelector((state) => state.allTypes);
  const userCurrent = useSelector((state) => state.user);
  const created = useSelector((state) => state.created);
  const [currentPage, setCurrentPage] = useState(1);
  const favoritesPerPage = 12;
  const totalPages = Math.ceil(favorites.length / favoritesPerPage);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let loadingTimeout;

    if (favorites.length > 0) {
      setIsLoading(false);
    } else {
      loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    return () => clearTimeout(loadingTimeout);
    // eslint-disable-next-line
  }, []);

  if (isLoading || (!allTypes.length && !favorites.length)) {
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
      {favorites.length && !isLoading ? (
        favorites
          .slice(
            (currentPage - 1) * favoritesPerPage,
            currentPage * favoritesPerPage
          )
          .map((pokemon, index) => (
            <Card
              currentPage={currentPage}
              numbersPokemons={favorites.length}
              setCurrentPage={setCurrentPage}
              pokemon={pokemon}
              getType={getType}
              userId={userCurrent?.id}
              key={index}
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
        {favorites &&
          Array.from({ length: totalPages }, (_, index) => (
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
