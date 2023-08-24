import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAILS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  POST_POKEMON,
  CLEAR_STATE_POKEMON,
  GET_TYPES,
  FILTER_TYPES,
  FILTER_CREATES,
  ORDER_NAME,
  DELETE_POKEMON,
  ADD_POKEMON
} from "../actions/types.js";

const initialState = {
  pokemons: [],
  pokemon: {},
  allTypes: [],
  filteredPokemons: [],
};

function rootReducer(state = initialState, action) {
  let newArray = [];
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
      return{
        ...state,
        pokemons: [action.payload, ...state.pokemons]
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

    // case RESTORE_POKEMONS:
    //   return {
    //     ...state,
    //     pokemons: state.pokemons,
    //     filteredPokemons: state.pokemons,
    //   };

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
