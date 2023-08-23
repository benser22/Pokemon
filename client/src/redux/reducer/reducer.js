import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAILS,
  GET_POKEMON_BY_NAME,
  POST_POKEMON,
  RESTORE_POKEMONS,
  GET_TYPES,
  FILTER_TYPES,
  FILTER_CREATES,
  ORDER_NAME,
  DELETE_POKEMON,
} from "../actions/types.js";

const initialState = {
  pokemons: [],
  pokemon: {},
  allTypes: [],
  filteredPokemons: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
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
        // filteredPokemons: [...state.filteredPokemons, action.payload],
      };

    case DELETE_POKEMON:
      let newArray = [];
        newArray = state.pokemons.filter((poke) => poke.id !== action.payload);
        state.pokemons = newArray;
      return {
        ...state,
      };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemon: action.payload,
        // filteredPokemons: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    case FILTER_TYPES:
      const allPokemons = state.pokemons;
      const filterTypes = allPokemons.filter(
        (poke) =>
          poke.types[0].name === action.payload ||
          poke.types[1]?.name === action.payload
      );
      return {
        ...state,
        filteredPokemons: filterTypes,
      };

    case FILTER_CREATES:
      const filterCreated = state.pokemons.filter((p) => p.created);
      return {
        ...state,
        filteredPokemons: filterCreated,
      };

    case RESTORE_POKEMONS:
      return {
        ...state,
        pokemons: state.pokemons,
        filteredPokemons: state.pokemons,
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
