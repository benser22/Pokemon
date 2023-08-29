import axios from "axios";
import {
  GET_ALL_POKEMONS,
  GET_FAVORITES_BY_USER,
  POST_FAVORITES_BY_USER,
  DELETE_FAVORITES_BY_USER,
  GET_POKEMON_DETAILS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  GET_TYPES,
  ADD_POKEMON,
  POST_POKEMON,
  FILTER_TYPES,
  CLEAR_STATE_POKEMON,
  FILTER_CREATES,
  ORDER,
  DELETE_POKEMON,
  RESTORE_POKEMONS,
  LOGIN,
  LOGOUT,
  GET_ACCESS_USER,
} from "./types.js";

const URL = "http://localhost:3001/pokemons";
axios.defaults.withCredentials = true;

export const getAccesUser = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/profile/get`);
      dispatch({
        type: GET_ACCESS_USER,
        payload: data.rol,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN,
        payload: data,
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};

// En el archivo "actions.js" (o donde definas tus acciones)
export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};

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

export const getFavoritesByUser = (idUser) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(URL + `/user/${idUser}/favorites`);
      dispatch({
        type: GET_FAVORITES_BY_USER,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const deleteFavoritesByUser = (idUser, name) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.delete(
        URL + `/user/${idUser}/favorites/${name}`
      );
      dispatch({
        type: DELETE_FAVORITES_BY_USER,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postFavoritesByUser = (idUser, info) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        URL + `/user/${idUser}/favorites`,
        info
      );
      dispatch({
        type: POST_FAVORITES_BY_USER,
        payload: data,
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
      await axios.delete(`${URL}/${id}`);
      dispatch({
        type: DELETE_POKEMON,
        payload: id,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

// export const getPokemonByName = (name) => {
//   return async function (dispatch) {
//     try {
//       const { data } = await axios.get(`${URL}/name?name=${name}`);
//       dispatch({
//         type: GET_POKEMON_BY_NAME,
//         payload: data,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
// En tus actions.js
export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/name?name=${name}`);
      if (data) {
        dispatch({ type: GET_POKEMON_BY_NAME, payload: data });
      }
    } catch (error) {
      throw error;
    }
  };
};

// export const getPokemonById = (id) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(`${URL}/${id}`);
//       dispatch({
//         type: GET_POKEMON_BY_ID,
//         payload: data,
//       });
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
// };
export const getPokemonById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/${id}`);
      if (data) {
        dispatch({ type: GET_POKEMON_BY_ID, payload: data });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const clearStatePokemon = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CLEAR_STATE_POKEMON,
        payload: {},
      });
    } catch (error) {
      console.error(error.message);
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

export const order = (option, direction) => {
  option = option.toLowerCase();
  direction = direction.toLowerCase();
  return {
    type: ORDER,
    payload: { option, direction },
  };
};

// Hago esta action adicional porque necesito una funcion que solo agregue un pokemon al estado de redux, en cambio postPokemon lo agrega a la BDD
export const addPokemon = (pokemon) => {
  return {
    type: ADD_POKEMON,
    payload: pokemon,
  };
};
