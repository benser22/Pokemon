import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  userEvent,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Home from "../Pages/Home/Home";
import Details from "../Pages/Details/Details";
import CreatePokemon from "../Pages/CreatePokemon/CreatePokemon";
import Error404 from "../components/Error404/Error404";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  // console.error.mockRestore();
});

describe("LandingPage component", () => {
  test("renders LandingPage component with login form modal", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    // Verificar que el botón "Login" está presente
    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();

    // Al hacer clic en el botón "Login", debería abrirse el modal del formulario
    fireEvent.click(loginButton);
    // Verificar que el formulario está presente en el modal
    const formModal = screen.getByTestId("form-component");
    expect(formModal).toBeInTheDocument();

    store.dispatch({
      type: "LOGIN",
      payload: {
        email: "benser22@hotmail.com",
        firsName: "Benjamín",
        password: "password1",
      },
    });
    const userState = store.getState().user;
    expect(userState.email).toBe("benser22@hotmail.com");
  });
});

describe("Home component", () => {
  test("renders Home component correctly", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home noTesting={false} />
        </MemoryRouter>
      </Provider>
    );

    // Verificar algún elemento presente en la Home
    const orderSelectElement = screen.getByLabelText("Show only created");
    expect(orderSelectElement).toBeInTheDocument();

    // Verificar que el contenedor Div de Home está presente
    const homeComponent = screen.getByTestId("home-component");
    expect(homeComponent).toBeInTheDocument();
  });
});

describe("Details component", () => {
  test("renders Details component with a number parameter and accesses an element", async () => {
      const initialState = {
        pokemon: {
          id: 1,
          name: "Pikachu",
          hp: 100,
          attack: 50,
          defense: 30,
          speed: 60,
          height: 0.4,
          weight: 6,
          types: ["Electric"],
          // Otros campos que necesites
        },
        allTypes: [
          { name: "Electric", image_type: "electric.png" },
          { name: "Fire", image_type: "fire.png" },
        ],
      };
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/details/25"]}>
          <Routes>
            <Route
              path="/details/:id"
              element={<Details noTesting={false} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    //vericar que el elemento con data-testid "details-component" esté presente
    const detailsComponent = screen.getByTestId("details-component");
    expect(detailsComponent).toBeInTheDocument();

    // Esperar a que el componente se cargue completamente
    waitFor(() => {
      const namePokemon = screen.getByTestId("namePokemon");
      // Verificar el contenido del elemento
      expect(namePokemon.textContent).toBe("PIKACHU");
    });
  });
});

describe("CreatePokemon component", () => {
  test("renders CreatePokemon component with a form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreatePokemon />
        </MemoryRouter>
      </Provider>
    );

    // Verificar que el componente se renderice correctamente
    const createPokemonComponent = screen.getByText(/Create Pokemon/i);
    expect(createPokemonComponent).toBeInTheDocument();

    // Verificar que haya un formulario en el componente
    const formElement = screen.getByTestId("pokemon-form");
    expect(formElement).toBeInTheDocument();
  });
});

describe("Error404 component", () => {
  test("renders Error404 component when the route is invalid", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/invalid"]}>
          <Error404 />
        </MemoryRouter>
      </Provider>
    );
    const error404Element = screen.getByTestId("error404-component");
    expect(error404Element).toBeInTheDocument();
  });
});

