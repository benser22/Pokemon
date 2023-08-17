import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deletePokemon,
  getPokemonDetails,
} from '../../redux/actions/actions.js';
import styles from './Details.module.css';
import { TYPES, IMGTYPES, STATS } from '../../constants/types.js';
import Loader from '../../components/Loader/Loader.jsx';
import deleteImg from '../../assets/extras/delete.png';

const Details = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokemonDetails(id));
  }, [dispatch, id]);

  const pokemon = useSelector((state) => state.pokemon);

  let [fondo, setFondo] = useState({ background: 'black' });

  useEffect(() => {
    if (pokemon.types) {
      setFondo({ background: TYPES[pokemon.types[0]?.name] });
    }
  }, [pokemon.types]);

  const handleDelete = (id) => {
    dispatch(deletePokemon(id));
    //dispatch(getAllPokemons());
    navigate('/pokemons');
  };

  return (
    <div>
      {pokemon.id == id ? (
        <div className={styles.container} style={fondo}>
          <div className={styles.containerSup}>
            {/* Container TYPES */}
            <div
              className={styles.containerNameTypes}
              style={{ transform: 'translate(0)' }}
            >
              <h1>{pokemon.name}</h1>
            </div>
            {/* Container IMAGEN */}
            <div className={styles.imageMain}>
              {pokemon.image ? (
                <img
                  src={pokemon.image}
                  alt='pokemon'
                  loading='lazy'
                  className={styles.imgPoke}
                />
              ) : null}
            </div>
            {/* Container de INFO */}
            <div className={styles.containerDetails}>
              <h4>HEIGHT: {pokemon.height / 10} mts</h4>
              <h4>WEIGHT: {pokemon.weight / 10} kg</h4>
              <div className={styles.containerT}>
                {pokemon.types &&
                  pokemon.types.map((poke) => (
                    <div className={styles.containerTypes} key={poke.name}>
                      <img
                        src={IMGTYPES[poke.name]}
                        alt={poke.name}
                        className={styles.typesImg}
                      />
                      <h4>{poke.name}</h4>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className={styles.containerInf}>
            {/* Contenedor de STATS */}
            <div className={styles.progress}>
              <div className={styles.stats}>
                <div className={styles.statsName}>
                  <h5>HEALT</h5>
                </div>
                <div
                  className={styles.progressValue}
                  style={{
                    width: `${(pokemon.hp * 100) / 150}%`,
                    background: STATS.hp,
                  }}
                ></div>
                <h5>{pokemon.hp}</h5>
              </div>
              <div className={styles.stats}>
                <div className={styles.statsName}>
                  <h5>ATTACK</h5>
                </div>
                <div
                  className={styles.progressValue}
                  style={{
                    width: `${(pokemon.attack * 100) / 150}%`,
                    background: STATS.attack,
                  }}
                ></div>
                <h5>{pokemon.attack}</h5>
              </div>
              <div className={styles.stats}>
                <div className={styles.statsName}>
                  <h5>DEFENSE</h5>
                </div>
                <div
                  className={styles.progressValue}
                  style={{
                    width: `${(pokemon.defense * 100) / 150}%`,
                    background: STATS.defense,
                  }}
                ></div>
                <h5>{pokemon.defense}</h5>
              </div>
              <div className={styles.stats}>
                <div className={styles.statsName}>
                  <h5>SPEED</h5>
                </div>
                <div
                  className={styles.progressValue}
                  style={{
                    width: `${(pokemon.speed * 100) / 150}%`,
                    background: STATS.speed,
                  }}
                ></div>
                <h5>{pokemon.speed}</h5>
              </div>
            </div>

            {/* Contenedor Cadena de Evolucion */}
            <div className={styles.containerEvo}>
              {pokemon.created ? (
                <div
                  className={styles.containerDelete}
                  onClick={() => handleDelete(pokemon.id)}
                >
                  <h5>DELETE POKEMON </h5>
                  <img
                    src={deleteImg}
                    alt='delete'
                    className={styles.deleteImg}
                  />
                </div>
              ) : (
                <h3>POKEMON FAMILY</h3>
              )}
              {pokemon.evolution ? (
                <div className={styles.evolutions}>
                  {pokemon.evolution.map((chain) => (
                    <div key={chain.name} className={styles.evo}>
                      <img
                        src={chain.img}
                        alt={chain.name}
                        className={styles.imgChain}
                      />
                      <p>{chain.name}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Details;
