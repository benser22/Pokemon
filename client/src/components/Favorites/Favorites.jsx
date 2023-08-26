// Home.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTypes, getFavoritesByUser } from "../../redux/actions/actions";
import styles from "./Favorites.module.css";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader2";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const allTypes = useSelector((state) => state.allTypes);
  const userCurrent = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const favoritesPerPage = 12;
  const totalPages = Math.ceil(favorites.length / favoritesPerPage);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !userCurrent.email && navigate("/");
  }, [userCurrent, navigate]);

  useEffect(() => {
    if (!favorites) {
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

  return (
    <div className={styles.container}>
      {favorites
        .slice(
          (currentPage - 1) * favoritesPerPage,
          currentPage * favoritesPerPage
        )
        .map((pokemon, index) => (
          <Card
            pokemon={pokemon}
            getType={getType}
            userId={userCurrent.id}
            key={index}
          />
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
