// reducers.test.js
import reducer from "../redux/reducers/reducers";
import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "../redux/actions/actions";

describe("Test Redux: Reducers", () => {
  it("should handle ADD_FAV", () => {
    const initialState = {
      favorites: [],
      allCharacters: [],
      order: "A",
      filter: "",
    };
    const characterData = { id: 1, name: "Rick Sanchez" };
    const action = { type: ADD_FAV, payload: characterData };

    const newState = reducer(initialState, action);

    expect(newState.favorites).toEqual(characterData);
    expect(newState.allCharacters).toEqual(characterData);
  });

  it("should handle REMOVE_FAV", () => {
    const initialState = {
      favorites: [{ id: 1, name: "Rick Sanchez" }],
      allCharacters: [{ id: 1, name: "Rick Sanchez" }],
      order: "A",
      filter: "",
    };

    const action = {
      type: REMOVE_FAV,
      payload: 1, // Enviamos solo el ID del personaje a eliminar
    };

    const newState = reducer(initialState, action);

    // Esperamos que el reducer esté mandando el id correcto hacia las actions
    expect(action.payload).toEqual(newState.favorites);

  });

  it("should handle FILTER", () => {
    const initialState = {
      favorites: [],
      allCharacters: [],
      order: "A",
      filter: "",
    };
    const filterValue = "Male";
    const action = {
      type: FILTER,
      payload: filterValue,
    };

    const newState = reducer(initialState, action);

    expect(newState.filter).toEqual(filterValue);
  });

  it("should handle ORDER", () => {
    const initialState = {
      favorites: [
        { id: 2, name: "Morty Smith" },
        { id: 1, name: "Rick Sanchez" },
      ],
      allCharacters: [
        { id: 2, name: "Morty Smith" },
        { id: 1, name: "Rick Sanchez" },
      ],
      order: "A",
      filter: "",
    };
    const newOrder = "D"; // Or any other order you want to test
    const action = {
      type: ORDER,
      payload: newOrder,
    };

    const newState = reducer(initialState, action);

    const expectedFavorites =
      newOrder === "A"
        ? [
            { id: 1, name: "Rick Sanchez" },
            { id: 2, name: "Morty Smith" },
          ]
        : [
            { id: 2, name: "Morty Smith" },
            { id: 1, name: "Rick Sanchez" },
          ];

    expect(newState.favorites).toEqual(expectedFavorites);
    expect(newState.order).toEqual(newOrder);
  });
});
