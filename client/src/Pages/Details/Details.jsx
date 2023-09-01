import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPokemonDetails,
  clearStatePokemon,
} from "../../redux/actions/actions.js";
import styles from "./Details.module.css";
import { IMAGES } from "../../constants/types.js";
import { FaHome } from "react-icons/fa";
import Loader from "../../components/Loader/Loader2";
import imgDefault from "../../assets/default.png";
import Bar from "../../components/Bar/Bar.jsx";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pokemon = useSelector((state) => state.pokemon);
  const imageUrl = IMAGES[id] || (pokemon.img ? pokemon.img : imgDefault);
  const [isLoading, setIsLoading] = useState(true);
  const allTypes = useSelector((state) => state.allTypes);


  useEffect(() => {
    dispatch(getPokemonDetails(id));

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(loadingTimeout);
  }, [dispatch, id]);

  if (isLoading || !pokemon) {
    return <Loader />;
  }

  const handleHomeClick = () => {
    dispatch(clearStatePokemon());
    navigate("/home");
  };

  const getType = (name) => {
    if (allTypes.length > 0) {
      const { image_type } = allTypes.find((t) => t.name === name);
      return image_type;
    }
    return;
  };

  return (
    <div className={styles.background}>
      <div className={styles.detailsContainer}>
        {pokemon && (
          <>
            <div className={styles.header}>
              {pokemon.id >= 5000 ? (
                <p className={styles.pokemonId}>#{pokemon.id} (created)</p>
              ) : (
                <p className={styles.pokemonId}>#{pokemon.id}</p>
              )}
              {pokemon.name && (
                <p className={styles.pokemonName}>
                  {pokemon.name.toUpperCase()}
                </p>
              )}
            </div>

            <div className={styles.pokemonDetails}>
              <img
                src={imageUrl}
                className={styles.pokemonImg}
                alt="Pokemon_IMG"
              ></img>
              <div className={styles.pokemonInfo}>
                <Bar tag={"Health Points"} value={pokemon.hp} maxValue={255} />
                <Bar tag={"Attack"} value={pokemon.attack} maxValue={255} />
                <Bar tag={"Defense"} value={pokemon.defense} maxValue={255} />
                <Bar tag={"Speed"} value={pokemon.speed} maxValue={255} />
                <Bar tag={"Height (mts)"} value={pokemon.height} maxValue={20} />
                <Bar
                  tag={"Weight (kgs)"}
                  value={pokemon.weight}
                  maxValue={1000}
                />
                <div className={styles.footer}>
                  {pokemon.types?.map((type, index) => (
                    <span key={index} className={styles.type}>
                      <img
                        src={getType(type)}
                        alt={type}
                        className={styles.typeImage}
                      />
                      <span className={styles.typeSpan}>
                        {type.toUpperCase()}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        <button
          className={styles.mybutton}
          onClick={handleHomeClick}
          title="Back to Home"
        >
          <FaHome />
        </button>
      </div>
    </div>
  );
};

export default Details;