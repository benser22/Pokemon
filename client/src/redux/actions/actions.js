import axios from "axios";
import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAILS,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  POST_POKEMON,
  FILTER_TYPES,
  RESTORE_POKEMONS,
  FILTER_CREATES,
  ORDER_NAME,
  DELETE_POKEMON,
} from "./types.js";

const URL = "http://localhost:3001/pokemons";

export const getAllPokemons = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/`);
      dispatch({
        type: GET_ALL_POKEMONS,
        payload: data.results,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPokemonDetails = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/${id}`);
      dispatch({
        type: GET_POKEMON_DETAILS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/types`);
      dispatch({
        type: GET_TYPES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postPokemon = (values) => {
  const input = {
    name: values.name,
    types: values.types,
    img: values.img,
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
      const { data } = await axios.post(`${URL}/`, input);
      dispatch({
        type: POST_POKEMON,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deletePokemon = (id) => {
  return async (dispatch) => {
    try {
      if (typeof id !== "number") {
        await axios.delete(`${URL}/${id}`);
      }
      dispatch({
        type: DELETE_POKEMON,
        payload: id,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/${name}`);
      dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: data,
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
