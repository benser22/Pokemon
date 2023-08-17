import React from 'react';
import { IMGTYPES, TYPES } from '../../constants/types.js';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { IMAGES } from '../../constants/types.js';

export default function Card({ id, name, image, types,toggle }) {
  return (
    types && (
      <div
        className={styles.card}
        style={{ background: TYPES[types[0]?.name] }}
      >
        <div className={styles.info}>
          <h2>{name}</h2>
          <div className={styles.containerTypes}>
            {types &&
              types.map((poke) => (
                <div className={styles.imgAndName} key={`${id}${poke.name}`}>
                  <img
                    src={IMGTYPES[poke.name]}
                    alt={poke.name}
                    className={styles.typesImg}
                  />
                  <h3>{poke.name}</h3>
                </div>
              ))}
          </div>
        </div>

        <Link to={`/pokemons/${id}`}>
          {IMAGES[id] && toggle ? (
            <img src={IMAGES[id]} alt={name} className={styles.imgPoke} />
          ) : (
            <img src={image} alt={name} className={styles.imgPoke} />
          )}
        </Link>
      </div>
    )
  );
}
