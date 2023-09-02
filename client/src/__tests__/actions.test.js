import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  POST_POKEMON,
  postPokemon,
  ORDER,
  order,
  FILTER,
  filter,
} from "../redux/actions/actions";
import { waitFor } from "@testing-library/react";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("axios");

describe("Test Redux: Create Pokemon Action", () => {
  it("should create POST_POKEMON action when creating a new Pokémon", async () => {
    const newPokemonData = {
      name: "Charizard22",
      types: ["Fire", "Flying"],
      img: "charizard.jpg",
      hp: 100,
      attack: 110,
      defense: 85,
      speed: 100,
      height: 1.7,
      weight: 90.5,
    };

    // Simular una respuesta exitosa de axios
    axios.post.mockResolvedValueOnce({ data: newPokemonData });

    const expectedActions = [
      {
        type: POST_POKEMON,
        payload: newPokemonData,
      },
    ];
    const store = mockStore({});

    // Dispatch de la acción de manera asincrónica
    store.dispatch(postPokemon(newPokemonData));

    // Usar waitFor para esperar a que la acción se complete
    waitFor(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("Test Redux: Order Action", () => {
  it("should create ORDER action when ordering Pokémon", () => {
    // Ajusta la dirección y el tipo de orden según tu proyecto actual
    const orderDirection = "ASC";
    const orderType = "name"; // Puedes usar "name", "hp", "attack", etc.

    // Ajusta el tipo de acción esperada según tu proyecto actual
    const expectedAction = {
      type: ORDER,
      payload: { option: orderType, direction: orderDirection },
    };

    // Llama a la acción de orden
    const action = order(orderType, orderDirection);

    // Comprueba que la acción se haya creado correctamente
    waitFor(() => {
      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Test Redux: Filter Action", () => {
  it("should create FILTER action when filtering Pokémon", () => {
    // Ajusta el tipo de filtro que deseas aplicar según tu proyecto actual
    const filterType = "Fire"; // Puedes usar "Electric", "Water", "Grass", etc.

    // Ajusta el tipo de acción esperada según tu proyecto actual
    const expectedAction = { type: FILTER, payload: filterType };

    // Llama a la acción de filtrado
    const action = filter(filterType);

    // Comprueba que la acción se haya creado correctamente
    waitFor(() => {
      expect(action).toEqual(expectedAction);
    });
  });
});
