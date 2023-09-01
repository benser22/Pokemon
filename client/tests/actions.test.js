// actions.test.js
import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  ADD_FAV,
  REMOVE_FAV,
  FILTER,
  ORDER,
  REMOVE_ALL_FAVORITES,
  addFav,
  removeFav,
  removeAllFavorites,
  orderCards,
  filterCards,
} from "../redux/actions/actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("axios");

describe("Test Redux: Actions", () => {
  it("should create ADD_FAV action", async () => {
    const characterData = { id: 1, name: "Morty Smith" };
    axios.post.mockResolvedValueOnce({ data: characterData });

    const expectedActions = [{ type: ADD_FAV, payload: characterData }];
    const store = mockStore({});

    await store.dispatch(addFav(characterData));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create REMOVE_FAV action", async () => {
    const characterIdToRemove = 1;
    const removedCharacterData = {
      id: characterIdToRemove,
      name: "Rick Sanchez",
    };
    axios.delete.mockResolvedValueOnce({ data: removedCharacterData });

    const expectedActions = [
      { type: REMOVE_FAV, payload: removedCharacterData },
    ];
    const store = mockStore({});

    await store.dispatch(removeFav(characterIdToRemove));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create REMOVE_ALL_FAVORITES action", async () => {
    axios.delete.mockResolvedValueOnce();

    const expectedActions = [{ type: REMOVE_ALL_FAVORITES }];
    const store = mockStore({});

    await store.dispatch(removeAllFavorites());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create ORDER action", () => {
    const order = "D"; // Or any other order you want to test
    const expectedAction = { type: ORDER, payload: order };

    const action = orderCards(order);

    expect(action).toEqual(expectedAction);
  });

  it("should create FILTER action", () => {
    const filter = "Male"; // Or any other filter you want to test
    const expectedAction = { type: FILTER, payload: filter };

    const action = filterCards(filter);

    expect(action).toEqual(expectedAction);
  });

});
