import {
  GET_ALL_POKEMONS,
  GET_TYPES,
  GET_POKEMON_DETAILS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  POST_FAVORITES_BY_USER,
  GET_FAVORITES_BY_USER,
  DELETE_FAVORITES_BY_USER,
  POST_POKEMON,
  DELETE_POKEMON,
  CLEAR_STATE_POKEMON,
  FILTER_TYPES,
  FILTER_CREATES,
  ORDER_NAME,
  ADD_POKEMON,
  SAVE_USER,
  LOGIN,
  LOGOUT,
  GET_ACCESS_USER,
} from "../actions/types.js";

const initialState = {
  pokemons: [],
  pokemon: {},
  allTypes: [],
  filteredPokemons: [],
  favorites: [],
  user: {
    access: false,
    rol: "",
  },
};

function rootReducer(state = initialState, action) {
  let newArray = [];
  switch (action.type) {
    // CASO DE ACCIONES PARA LA AUTENTIFICACION
    //**************************** */
    case LOGIN:
      return {
        ...state,
        user: {
          ...action.payload,
          access: true,
        },
      };

    case LOGOUT:
      return {
        ...state,
        user: {
          access: false,
        },
      };
    //**************************** */

    case GET_ACCESS_USER:
      return {
        ...state,
        user: {...state.user, rol: action.payload},
      };

    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filteredPokemons: action.payload,
      };

    case DELETE_FAVORITES_BY_USER:
      const { name } = action.payload;
      const updatedFavorites = state.favorites.filter(
        (pokemon) => pokemon.name !== name
      );
      return {
        ...state,
        favorites: updatedFavorites,
      };

    case GET_FAVORITES_BY_USER:
      return {
        ...state,
        favorites: action.payload,
      };

    case POST_FAVORITES_BY_USER:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case GET_POKEMON_DETAILS:
      return {
        ...state,
        pokemon: action.payload,
      };

    case POST_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        filteredPokemons: [...state.pokemons, action.payload],
      };

    case DELETE_POKEMON:
      newArray = state.pokemons.filter((poke) => poke.id !== action.payload);
      return {
        ...state,
        pokemons: newArray,
        filteredPokemons: newArray,
      };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemon: action.payload,
      };

    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemon: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    case ADD_POKEMON:
      return {
        ...state,
        pokemons: [action.payload, ...state.pokemons],
      };

    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case FILTER_TYPES:
      return {};

    case CLEAR_STATE_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };

    case FILTER_CREATES:
      const filterCreated = state.pokemons.filter((p) => p.created);
      return {
        ...state,
        filteredPokemons: filterCreated,
      };

    case ORDER_NAME:
      const sortOrder = action.payload.sortOrder;
      const order = action.payload.order === "ascending" ? 1 : -1;
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) => {
        if (a[sortOrder] > b[sortOrder]) return order;
        if (a[sortOrder] < b[sortOrder]) return -order;
        return 0;
      });
      return {
        ...state,
        filteredPokemons: sortedPokemons,
      };

    default:
      return state;
  }
}

export default rootReducer;
