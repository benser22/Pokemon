// reducers.test.js
import rootReducer from "../redux/reducer/reducer";
import {
  ORDER,
  FILTER,
  ADD_POKEMON,
  DELETE_POKEMON,
} from "../redux/actions/types";

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
  user: {},
};

describe("Test Redux: Reducers", () => {
  it("should handle ADD_POKEMON", async () => {
    const pokemonData = { id: 2222, name: "Pokechanta" };
    const action = { type: ADD_POKEMON, payload: pokemonData };

    const newState = rootReducer(initialState, action);

    expect(newState.pokemons).toEqual([pokemonData]);
  });

  it("should handle DELETE_POKEMON", () => {
    const initialState = {
      pokemons: [{ id: 22, name: "Pokechanta" }],
    };

    const action = {
      type: DELETE_POKEMON,
      payload: 22,
    };

    const newState = rootReducer(initialState, action);

    expect(newState.pokemons).toEqual([]);
  });

  it("should handle ORDER", () => {
    const initialState = {
      pokemons: [{ name: "B" }, { name: "C" }, { name: "A" }],
      favorites: [{ name: "B" }, { name: "C" }, { name: "A" }],
    };
    const payload = { option: "name", direction: "(Ascending)" };
    const action = {
      type: ORDER,
      payload: payload,
    };

    const newState = rootReducer(initialState, action);

    expect(newState.pokemons).toEqual([
      { name: "A" },
      { name: "B" },
      { name: "C" },
    ]);
    expect(newState.favorites).toEqual([
      { name: "A" },
      { name: "B" },
      { name: "C" },
    ]);
  });

  it("should handle FILTER", () => {

    const data =  [
      { name: "Pokechanta", types: ["fire", "water"] },
      { name: "Pokeperro", types: ["bug"] },
      { name: "Pokegato", types: ["shadow", "bug"] },
    ];
    const initialState = {
      pokemons: data,
      favorites: data,
      initialPokemons: data,
      initialFavorites: data,
      orderOption: "-"
    };

    const filter = "bug";

    const action = {
      type: FILTER,
      payload: filter,
    };

    const newState = rootReducer(initialState, action);

    const expectedResults = [
      { name: "Pokeperro", types: ["bug"] },
      { name: "Pokegato", types: ["shadow", "bug"] },
    ];

    expect(newState.pokemons).toEqual(expectedResults);
    expect(newState.favorites).toEqual(expectedResults);
  });
});
