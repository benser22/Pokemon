import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import Detail from "../components/Detail/Detail";

// Evitar que se imprima el console.log durante los tests
beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

// Restaurar la función console.log después de los tests
afterEach(() => {
  console.log.mockRestore();
});

describe("App component", () => {
  test("renders Form component when the route is /", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const formElement = screen.getByTestId("form-component");
    expect(formElement).toBeInTheDocument();
  });

  test("renders Home component when the route is /home", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const homeElement = screen.getByTestId("home-component");
    expect(homeElement).toBeInTheDocument();
  });

  test("renders Favorites component when the route is /favorites", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/favorites"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const favoritesElement = screen.getByTestId("favorites-component");
    expect(favoritesElement).toBeInTheDocument();
  });

  test("renders About component when the route is /about", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/about"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const aboutElement = screen.getByTestId("about-component");
    expect(aboutElement).toBeInTheDocument();
  });

  test("renders Detail component with a specific ID", async () => {
    const id = "1";
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/detail/${id}`]}>
          <Routes>
            {/* Utilizar Route directamente para renderizar Detail */}
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  test("renders Error404 component when the route is invalid", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/invalid"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const error404Element = screen.getByTestId("error404-component");
    expect(error404Element).toBeInTheDocument();
  });
});
