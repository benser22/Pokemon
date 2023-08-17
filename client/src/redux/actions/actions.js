import axios from "axios";

export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const REMOVE_ALL_FAVORITES = "REMOVE_ALL_FAVORITES";
export const LOAD_FAVORITES = "LOAD_FAVORITES"; 


export const loadFavorites = () => {
  const endpoint = "http://localhost:3001/rickandmorty/fav"; 
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      if (!data) {
        throw new Error("An error occurred while loading favorites");
      }
      return dispatch({
        type: LOAD_FAVORITES,
        payload: data, 
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// ACTION | addFav
export const addFav = (character) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);
      if (!data) {
        throw new Error("An error occurred in the action of adding a favorite");
      }
      return dispatch({
        type: "ADD_FAV",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// ACTION | removeFav
export const removeFav = (id) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      if (!data) {
        throw new Error(
          "An error occurred in the action of removing a favorite"
        );
      }
      return dispatch({
        type: "REMOVE_FAV",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// Acción para eliminar todos los favoritos
export const removeAllFavorites = () => {
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  return (dispatch) => {
    axios.delete(endpoint).then(() => {
      dispatch({
        type: REMOVE_ALL_FAVORITES,
      });
    });
  };
};

// Acción para ordenar las tarjetas
export const orderCards = (order) => ({
  type: "ORDER",
  payload: order,
});

// Acción para filtrar las tarjetas por género
export const filterCards = (gender) => ({
  type: "FILTER",
  payload: gender,
});
