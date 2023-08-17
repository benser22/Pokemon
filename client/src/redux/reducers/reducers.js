import {
  ADD_FAV,
  REMOVE_FAV,
  FILTER,
  ORDER,
  REMOVE_ALL_FAVORITES,
  LOAD_FAVORITES
} from "../actions/actions";

const initialState = {
  favorites: [],
  allCharacters: [],
  order: "A",
  filter: "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAV:
      return { favorites: payload, allCharacters: payload };

    case REMOVE_FAV:
      return { favorites: payload, allCharacters: payload };

    case FILTER:
      return {
        ...state,
        filter: payload,
      };
      
    case ORDER:
      let orderFavorites;
      if (payload === "A") {
        orderFavorites = [...state.favorites].sort((a, b) => a.id - b.id);
      } else {
        orderFavorites = [...state.favorites].sort((a, b) => b.id - a.id);
      }
      return {
        ...state,
        favorites: [...orderFavorites],
        order: payload,
      };

    case REMOVE_ALL_FAVORITES:
      return {
        ...state,
        favorites: [],
        allCharacters: [],
      };

      case LOAD_FAVORITES: // Reducer para cargar los favoritos desde el servidor
      return {
        ...state,
        favorites: payload,
      };

    default:
      return state;
  }
};

export default reducer;
