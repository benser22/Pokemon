import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonDetails, clearStatePokemon } from "../../redux/actions/actions.js";
import styles from "./Details.module.css";
import { IMAGES } from "../../constants/types.js";
import { FaHome } from "react-icons/fa";
import Loader from "../../components/Loader/Loader2";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pokemon = useSelector((state) => state.pokemon);
  const imageUrl = IMAGES[id] || pokemon.img;
  const [isLoading, setIsLoading] = useState(true);
  let formattedName;
  
  if (pokemon.name) {
    formattedName = capitalizeFirstLetter(pokemon.name);
  }
  function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  useEffect(() => {
    dispatch(getPokemonDetails(id));

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(loadingTimeout);
  }, [dispatch, id]);

  if (isLoading || !pokemon) {
    return <Loader />;
  }

  const handleHomeClick = () => {
    dispatch(clearStatePokemon());
    navigate("/home");
  };

  return (
    <div className={styles.detailsContainer}>
      {pokemon && (
        <div className={styles.card}>
          <img src={imageUrl} alt={`${pokemon.name} sprite`} />
          <h2>{formattedName}</h2>
          <p>HP: {pokemon.hp}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p>Speed: {pokemon.speed}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}
      <button
        className={styles.mybutton}
        onClick={handleHomeClick}
        title="Back to Home"
      >
        <FaHome />
      </button>
    </div>
  );
};

export default Details;
