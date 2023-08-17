import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAILS,
  SEARCH_POKEMON,
  GET_TYPES,
  POST_POKEMON,
  FILTER_TYPES,
  RESTORE_POKEMONS,
  FILTER_CREATES,
  ORDER_NAME,
  DELETE_POKEMON,
} from './types.js';

const URLDIR = 'https://pokemon-app-production-d853.up.railway.app';
//const URLDIR = 'http://localhost:3001';

export const getAllPokemons = () => {
  return async function (dispatch) {
    console.log(URLDIR);
    return fetch(`${URLDIR}/pokemons`)
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: GET_ALL_POKEMONS,
          payload: json,
        })
      );
  };
};

export const getPokemonDetails = (id) => {
  return async function (dispatch) {
    return fetch(`${URLDIR}/pokemons/${id}`)
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: GET_POKEMON_DETAILS,
          payload: json,
        })
      );
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    return fetch(`${URLDIR}/types`)
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: GET_TYPES,
          payload: json,
        })
      );
  };
};

export const postPokemon = (values) => {
  const input = {
    name: values.name,
    types: [values.types],
    image: values.image,
    hp: values.hp,
    attack: values.attack,
    defense: values.defense,
    speed: values.speed,
    height: values.height,
    weight: values.weight,
    created: true,
  };
  return async function (dispatch) {
    return fetch(`${URLDIR}/pokemons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: POST_POKEMON,
          payload: json,
          types: input.types,
        })
      );
  };
};

export const deletePokemon = (id) => {
  return async (dispatch) => {
    try {
      return fetch(`${URLDIR}/pokemons/delete/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((json) => {
          dispatch({
            type: DELETE_POKEMON,
            payload: json.id,
          });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchByName = (name) => {
  return async function (dispatch) {
    return fetch(`${URLDIR}/pokemons?name=${name}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: SEARCH_POKEMON,
          payload: json,
        });
      });
  };
};

export const filterByTypes = (value) => {
  return {
    type: FILTER_TYPES,
    payload: value,
  };
};

export const restorePokemons = () => {
  return {
    type: RESTORE_POKEMONS,
    payload: null,
  };
};

export const filterPokeCreated = (value) => {
  return {
    type: FILTER_CREATES,
    payload: value,
  };
};

export const orderName = (order, sortOrder) => {
  return {
    type: ORDER_NAME,
    payload: { order, sortOrder },
  };
};
