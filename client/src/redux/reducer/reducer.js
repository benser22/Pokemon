import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAILS,
  SEARCH_POKEMON,
  POST_POKEMON,
  RESTORE_POKEMONS,
  GET_TYPES,
  FILTER_TYPES,
  FILTER_CREATES,
  ORDER_NAME,
  DELETE_POKEMON,
} from '../actions/types.js';

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
        filteredPokemons: action.payload,
      };

    case GET_POKEMON_DETAILS:
      return {
        ...state,
        pokemon: action.payload,
      };

    case POST_POKEMON:
      action.payload.types = action.types[0].map((type) => ({ name: type }));
      return {
        ...state,
        pokemons: [action.payload, ...state.pokemons],
        filteredPokemons: [action.payload, ...state.filteredPokemons],
      };

    case DELETE_POKEMON:
      const toDelete = state.pokemons;
      const pokeUpdates = toDelete.filter((poke) => poke.id !== action.payload);
      return {
        ...state,
        pokemons: pokeUpdates,
        filteredPokemons: pokeUpdates,
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        filteredPokemons: action.payload,
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
      const order = action.payload.order === 'ascending' ? 1 : -1;
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
