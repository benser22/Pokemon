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
  CLEAR_STATE_POKEMON,
  FILTER_CREATES,
  FILTER,
  ORDER,
  DELETE_POKEMON,
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
  created: false,
  orderOption: "-",
  orderDirection: "",
  filteredType: "-",
  user: {
    access: false,
    rol: "",
  },
};

function rootReducer(state = initialState, action) {
  // Variables para almacenar los resultados de ordenamiento y filtrado
  let orderedFilteredPokemons = [];
  let orderedFilteredFavorites = [];

  switch (action.type) {
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

    //! Opción para autentificado de usuario, obtenido por cookie
    case GET_ACCESS_USER:
      return {
        ...state,
        user: { ...state.user, rol: action.payload },
      };

    //! Opcion para traer todos los pokemons hacia la pokedex, tanto los de la Api como los de la bdd
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

    case DELETE_FAVORITES_BY_USER:
      const { name } = action.payload;
      const updatedFavorites = [...state.initialFavorites].filter(
        (pokemon) => pokemon.name !== name
      );
      return {
        ...state,
        initialFavorites: updatedFavorites,
        // a favorites lo trato diferente porque puede que el usuario esté viendo pokemones con filtrado
        favorites: [...state.favorites].filter(
          (pokemon) => pokemon.name !== name
        ),
      };

    //! Opción de agregar un pokemon que resultó de la busqueda en la SearchBar a la Pokedex
    case ADD_POKEMON:
      return {
        ...state,
        pokemons: [action.payload, ...state.pokemons],
        initialPokemons: [action.payload, ...state.pokemons],
      };

    //! Opción para limpiar el objeto que uso para Detail, o para la el resultado de la SearchBar
    case CLEAR_STATE_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };

    //! Opción para agregar un pokemón Creado
    case POST_POKEMON:
      return {
        ...state,
        initialPokemons: [action.payload, ...state.pokemons],
        pokemons: [action.payload, ...state.pokemons],
      };

    //! Eliimina un pokemon de la Pokedex, si es un creado, lo elimina también de la bdd
    case DELETE_POKEMON:
      const updatedPokemons = state.pokemons.filter(
        (poke) => poke.id !== action.payload
      );
      return {
        ...state,
        initialPokemons: updatedPokemons,
        pokemons: updatedPokemons,
      };

    case GET_POKEMON_DETAILS:
      return {
        ...state,
        pokemon: action.payload,
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

    //! Opción para llenar la base de datos con los Types existentes que consigo en la Api
    case GET_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    //! filtrado por creados o no
    case FILTER_CREATES:
      // me aseguro de no perder el orden y el filtrado actual
      let pokemonsCreated = [...state.initialPokemons];
      let favoritesCreated = [...state.initialFavorites];

      if (action.payload) {
        pokemonsCreated = pokemonsCreated.filter((poke) => poke.created);
        favoritesCreated = favoritesCreated.filter((poke) => poke.created);
        // se estan mostrando los creados
        state.created = true;
      } else {
        // se estan mostrando todos
        state.created = false;
      }
      return {
        ...state,
        pokemons: pokemonsCreated,
        favorites: favoritesCreated,
        orderOption: "-",
        orderDirection: "",
        filteredType: "-",
      };

    //! filtrado por types
    case FILTER:
      const filteredType = action.payload;

      // obtengo el estado inicial antes de filtrar, pero dependiendo si es está viendo los creados o no
      let orderedPokemons = [...state.initialPokemons];
      let orderedFavorites = [...state.initialFavorites];

      if (state.created) {
        orderedPokemons = orderedPokemons.filter(
          (poke) => poke.created === state.created
        );
        orderedFavorites = orderedFavorites.filter(
          (poke) => poke.created === state.created
        );
      }

      // Comprobar si los datos están siendo ordenados, si no deberé ordenarlos porque arranco desde el estado inicial
      if (state.orderOption !== "-") {
        const orderOption = state.orderOption;
        const direction = state.orderDirection;

        // Ordenar los datos según la opción y dirección de orden
        orderedPokemons.sort((a, b) => {
          if (
            direction === "(Ascending)" ||
            direction === "(A-Z)" ||
            direction === "[Min-Max]"
          ) {
            return a[orderOption] > b[orderOption] ? 1 : -1;
          } else {
            return a[orderOption] < b[orderOption] ? 1 : -1;
          }
        });

        orderedFavorites.sort((a, b) => {
          if (
            direction === "(Ascending)" ||
            direction === "(A-Z)" ||
            direction === "[Min-Max]"
          ) {
            return a[orderOption] > b[orderOption] ? 1 : -1;
          } else {
            return a[orderOption] < b[orderOption] ? 1 : -1;
          }
        });

        // Comprobar si también se está aplicando un filtro
        if (filteredType !== "-") {
          orderedFilteredPokemons = orderedPokemons.filter((p) =>
            p.types?.includes(filteredType)
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
        // Si no se está ordenando, comprobar si hay un filtro
        if (filteredType !== "-") {
          orderedFilteredPokemons = orderedPokemons.filter((p) =>
            p.types?.includes(filteredType)
          );
          orderedFilteredFavorites = orderedFavorites.filter((p) =>
            p.types?.includes(filteredType)
          );
        } else {
          // Si no se está ordenando ni filtrando, usar los datos iniciales, siempre discrimados por el estado de created
          if (state.created) {
            orderedFilteredPokemons = [...state.initialPokemons].filter(
              (poke) => poke.created === state.created
            );
            orderedFilteredFavorites = [...state.initialFavorites].filter(
              (poke) => poke.created === state.created
            );
          } else {
            // si la accion fue reset, devolver el estado inicial
            orderedFilteredPokemons = [...state.initialPokemons];
            orderedFilteredFavorites = [...state.initialFavorites];
          }
        }
      }

      return {
        ...state,
        pokemons: orderedFilteredPokemons,
        favorites: orderedFilteredFavorites,
        filteredType: filteredType.toUpperCase(),
      };

    //! Ordenado por diferentes atributos de un pokemón, tando ascende como descendente
    case ORDER:
      const option = action.payload.option;
      const direction = action.payload.direction;
      let sortedPokemons = [...state.pokemons];
      let sortedFavorites = [...state.favorites];

      if (option !== "-") {
        // si hay algun orden
        sortedPokemons.sort((a, b) => {
          // si el orden es ascendente
          if (
            direction === "(Ascending)" ||
            direction === "(A-Z)" ||
            direction === "[Min-Max]"
          ) {
            return a[option] > b[option] ? 1 : -1;
          } else {
            // si el orden es descendente
            return a[option] < b[option] ? 1 : -1;
          }
        });
        // hago lo mismo con los favoritos
        sortedFavorites.sort((a, b) => {
          if (
            direction === "(Ascending)" ||
            direction === "(A-Z)" ||
            direction === "[Min-Max]"
          ) {
            return a[option] > b[option] ? 1 : -1;
          } else {
            return a[option] < b[option] ? 1 : -1;
          }
        });
      } else {
        // si el orden es default, quiero los pokemones sin perder el filtro previo y discriminados por created
        sortedPokemons = [...state.initialPokemons].filter((elemento) =>
          state.pokemons.includes(elemento)
        );
        sortedFavorites = [...state.initialFavorites].filter((elemento) =>
          state.favorites.includes(elemento)
        );
        if (state.created) {
          sortedPokemons = sortedPokemons.filter(
            (poke) => poke.created === state.created
          );
          sortedFavorites = sortedFavorites.filter(
            (poke) => poke.created === state.created
          );
        }
      }

      return {
        ...state,
        pokemons: sortedPokemons,
        favorites: sortedFavorites,
        orderOption: option.toUpperCase(),
        orderDirection: direction,
      };

    default:
      return state;
  }
}

export default rootReducer;
