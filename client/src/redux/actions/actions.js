import axios from 'axios';
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

const URL = 'http://localhost:3001/pokemons';

export const getAllPokemons = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/`);
      dispatch({
        type: GET_ALL_POKEMONS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPokemonDetails = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/${id}`);
      dispatch({
        type: GET_POKEMON_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/types`);
      dispatch({
        type: GET_TYPES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
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
    try {
      const response = await axios.post(`${URL}/`, input);
      dispatch({
        type: POST_POKEMON,
        payload: response.data,
        types: input.types,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deletePokemon = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${URL}/delete/${id}`);
      dispatch({
        type: DELETE_POKEMON,
        payload: response.data.id,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/?name=${name}`);
      dispatch({
        type: SEARCH_POKEMON,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
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
