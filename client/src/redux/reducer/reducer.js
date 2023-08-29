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
  ORDER,
  ADD_POKEMON,
  SAVE_USER,
  LOGIN,
  LOGOUT,
  GET_ACCESS_USER,
} from "../actions/types.js";

const initialState = {
  pokemons: [],
  backPokemons: [],
  favorites: [],
  backFavorites: [],
  pokemon: {},
  allTypes: [],
  user: {
    access: false,
    rol: "",
  },
  contador: 0,
};

function sortFunction(valueA, valueB, direction) {
  if (typeof valueA === "string" && typeof valueB === "string") {
    return direction === "ascending" ||
      direction === "(a-z)" ||
      direction === "[min-max]"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  } else if (typeof valueA === "number" && typeof valueB === "number") {
    return direction === "(ascending)" ||
      direction === "(a-z)" ||
      direction === "[min-max]"
      ? valueA - valueB
      : valueB - valueA;
  } else {
  }
}

function compareArrays(array1, array2) {
  // Si los arrays tienen diferente longitud, no son iguales
  if (array1.length !== array2.length) {
    return false;
  }
  // Comparar elemento por elemento
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

function rootReducer(state = initialState, action) {
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
        user: { ...state.user, rol: action.payload },
      };

    case GET_ALL_POKEMONS:
      // console.log("getallpokemons", state.contador);
      // state.contador++;
      if (
        state.pokemons.length === 0 ||
        state.pokemons.length < action.payload.length
      ) {
        return {
          ...state,
          pokemons: action.payload,
          backPokemons: action.payload,
        };
      } else return { ...state };

    case DELETE_FAVORITES_BY_USER:
      const { name } = action.payload;
      const updatedFavorites = state.favorites.filter(
        (pokemon) => pokemon.name !== name
      );
      return {
        ...state,
        favorites: updatedFavorites,
        backFavorites: updatedFavorites,
      };

    case GET_FAVORITES_BY_USER:
      if (
        state.favorites.length === 0 ||
        compareArrays(state.favorites, action.payload)
      ) {
        return {
          ...state,
          favorites: action.payload,
          backFavorites: action.payload,
        };
      } else return { ...state };

    case POST_FAVORITES_BY_USER:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        backFavorites: [...state.backFavorites, action.payload]
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
        backPokemons: [...state.pokemons, action.payload],
      };

    case DELETE_POKEMON:
      const newPokemons = state.pokemons.filter((poke) => poke.id !== action.payload);
      return {
        ...state,
        pokemons: newPokemons,
        backPokemons: newPokemons,
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
      console.log("entre aqui en action filter");
      let pokemonsCreated, favoritesCreated = []
      if (action.payload) {
        pokemonsCreated = state.pokemons.filter((p) => p.created);
        favoritesCreated = state.favorites.filter((p) => p.created);
      } else {
        pokemonsCreated = [...state.backPokemons];
        favoritesCreated = [...state.backFavorites];
      }
      return {
        ...state,
        pokemons: pokemonsCreated,
        favorites: favoritesCreated
      };

    case ORDER:
      const option = action.payload.option;
      const direction = action.payload.direction;
      const sortedPokemons = [...state.pokemons].sort((a, b) =>
        sortFunction(a[option], b[option], direction)
      );
      const sortedFavorites = [...state.favorites].sort((a, b) =>
        sortFunction(a[option], b[option], direction)
      );

      return {
        ...state,
        pokemons: sortedPokemons,
        backPokemons: sortedPokemons,
        favorites: sortedFavorites,
        backFavorites: sortedFavorites
      };

    default:
      return state;
  }
}

export default rootReducer;
