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
  FILTER_CREATES,
  FILTER,
  ORDER,
  ADD_POKEMON,
  SAVE_USER,
  LOGIN,
  LOGOUT,
  GET_ACCESS_USER,
} from "../actions/types.js";

const initialState = {
  initialPokemons: [],
  pokemons: [],
  initialFavorites: [],
  favorites: [],
  pokemon: {},
  allTypes: [],
  user: {
    access: false,
    rol: "",
  },
  orderOption: "-",
  orderDirection: "asc",
  filteredType: "-",
};

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
      if (
        state.pokemons.length === 0 ||
        state.pokemons.length < action.payload.length
      ) {
        return {
          ...state,
          initialPokemons: action.payload,
          pokemons: action.payload,
        };
      } else return { ...state };

    case DELETE_FAVORITES_BY_USER:
      const { name } = action.payload;
      const updatedFavorites = state.favorites.filter(
        (pokemon) => pokemon.name !== name
        );
      const updatedFavorites2 = state.initialFavorites.filter(
        (pokemon) => pokemon.name !== name
        );
        console.log("aqui se van", updatedFavorites2);
        console.log("state.fav", state.initialFavorites);
      return {
        ...state,
        initialFavorites: updatedFavorites2,
        favorites: updatedFavorites,
      };

    case GET_FAVORITES_BY_USER:
      return {
        ...state,
        initialFavorites: action.payload,
        favorites: action.payload,
      };

    case POST_FAVORITES_BY_USER:
      return {
        ...state,
        initialFavorites: [...state.initialFavorites, action.payload],
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
        initialPokemons: [...state.pokemons, action.payload],
        pokemons: [...state.pokemons, action.payload],
      };

    case DELETE_POKEMON:
      const newPokemons = state.pokemons.filter(
        (poke) => poke.id !== action.payload
      );

      return {
        ...state,
        initialPokemons: newPokemons,
        pokemons: newPokemons,
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
        initialPokemons: [action.payload, ...state.pokemons],
      };

    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case CLEAR_STATE_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };

    case FILTER_CREATES:
      let pokemonsCreated,
        favoritesCreated = [];
      if (action.payload) {
        pokemonsCreated = state.pokemons.filter((p) => p.created);
        favoritesCreated = state.favorites.filter((p) => p.created);
      } else {
        pokemonsCreated = [...state.pokemons];
        favoritesCreated = [...state.favorites];
      }
      return {
        ...state,
        pokemons: pokemonsCreated,
        favorites: favoritesCreated,
      };

    case ORDER:
      const option = action.payload.option;
      const direction = action.payload.direction;

      let sortedPokemons = [...state.initialPokemons];
      let sortedFavorites = [...state.initialFavorites];

      if (option !== "-") {
        sortedPokemons.sort((a, b) => {
          if (direction === "asc") {
            return a[option] > b[option] ? 1 : -1;
          } else {
            return a[option] < b[option] ? 1 : -1;
          }
        });

        sortedFavorites.sort((a, b) => {
          if (direction === "asc") {
            return a[option] > b[option] ? 1 : -1;
          } else {
            return a[option] < b[option] ? 1 : -1;
          }
        });
      }

      let filteredSortedPokemons = [...sortedPokemons];
      let filteredSortedFavorites = [...sortedFavorites];

      if (state.filteredType !== "-") {
        filteredSortedPokemons = sortedPokemons.filter((p) =>
          p.types.includes(state.filteredType)
        );
        filteredSortedFavorites = sortedFavorites.filter((p) =>
          p.types?.includes(state.filteredType)
        );
      }

      return {
        ...state,
        pokemons: filteredSortedPokemons,
        favorites: filteredSortedFavorites,
        orderOption: option,
        orderDirection: direction,
      };

    case FILTER:
      const filteredType = action.payload;

      // Variables para almacenar los resultados de ordenamiento y filtrado
      let orderedFilteredPokemons = [];
      let orderedFilteredFavorites = [];
      let orderedPokemons = [...state.initialPokemons];
      let orderedFavorites = [...state.initialFavorites];

      // Comprobar si los datos están siendo ordenados
      if (state.orderOption !== "-") {
        const orderOption = state.orderOption;
        const orderDirection = state.orderDirection;

        // Ordenar los datos según la opción y dirección de orden
        orderedPokemons.sort((a, b) => {
          if (orderDirection === "asc") {
            return a[orderOption] > b[orderOption] ? 1 : -1;
          } else {
            return a[orderOption] < b[orderOption] ? 1 : -1;
          }
        });

        orderedFavorites.sort((a, b) => {
          if (orderDirection === "asc") {
            return a[orderOption] > b[orderOption] ? 1 : -1;
          } else {
            return a[orderOption] < b[orderOption] ? 1 : -1;
          }
        });

        // Comprobar si también se está aplicando un filtro
        if (filteredType !== "-" && orderedPokemons.length > 0) {
          
          orderedFilteredPokemons = orderedPokemons.filter((p) =>
          p.types.includes(filteredType)
          );
        }
        if (filteredType !== "-" && orderedFavorites.length > 0) {
          orderedFilteredFavorites = orderedFavorites.filter((p) =>
            p.types?.includes(filteredType)
          );
        } else {


          // Si no hay filtro, mantener el orden previo
          orderedFilteredPokemons = [...orderedPokemons];
          orderedFilteredFavorites = [...orderedFavorites];
        }
      } else {

        console.log("estoy entrando");
        // Si no se está ordenando, comprobar si hay un filtro
        if (filteredType !== "-") {
          orderedFilteredPokemons = orderedPokemons.filter((p) =>
            p.types.includes(filteredType)
          );
          orderedFilteredFavorites = orderedFavorites.filter((p) =>
            p.types?.includes(filteredType)
          );
        } else {
          
          console.log("aqui esta el problema", state.initialFavorites);
          // Si no se está ordenando ni filtrando, usar los datos iniciales
          orderedFilteredPokemons = [...state.initialPokemons];
          orderedFilteredFavorites = [...state.initialFavorites];
        }
      }

      // Devolver el estado actualizado con los resultados de ordenamiento y filtrado
      return {
        ...state,
        pokemons: orderedFilteredPokemons,
        favorites: orderedFilteredFavorites,
        filteredType: filteredType,
      };

    default:
      return state;
  }
}

export default rootReducer;
