import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import Favorites from "../components/Favorites/Favorites";
import "@testing-library/jest-dom/extend-expect";

describe("Favorites component", () => {
  test("renders correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    // Verificar que el título del componente está presente
    const titleElement = screen.getByText(/You have \d+ (card|cards)/);
    expect(titleElement).toBeInTheDocument();

    // Verificar que los botones de orden y filtro están presentes
    const orderSelectElement = screen.getByLabelText("Order by:");
    expect(orderSelectElement).toBeInTheDocument();
    const filterSelectElement = screen.getByLabelText("Filter by:");
    expect(filterSelectElement).toBeInTheDocument();

    // Verificar que el botón "Clear All Favorites" está presente
    const clearAllButton = screen.getByText("Clear All Favorites");
    expect(clearAllButton).toBeInTheDocument();

    // Verificar que el contenedor de cards está presente
    const cardsContainer = screen.getByTestId("cards-container");
    expect(cardsContainer).toBeInTheDocument();
  });

  test("renders order and filter options correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    // Verificar que las opciones de orden están presentes
    const orderAscOption = screen.getByText("Ascendent");
    expect(orderAscOption).toBeInTheDocument();
    const orderDescOption = screen.getByText("Descendent");
    expect(orderDescOption).toBeInTheDocument();

    // Verificar que las opciones de filtro están presentes
    const filterAllOption = screen.getByText("All");
    expect(filterAllOption).toBeInTheDocument();
    const filterMaleOption = screen.getByText("Male");
    expect(filterMaleOption).toBeInTheDocument();
    const filterFemaleOption = screen.getByText("Female");
    expect(filterFemaleOption).toBeInTheDocument();
    const filterGenderlessOption = screen.getByText("Genderless");
    expect(filterGenderlessOption).toBeInTheDocument();
    const filterUnknownOption = screen.getByText("Unknown");
    expect(filterUnknownOption).toBeInTheDocument();
  });

  test("displays 'Clear All Favorites' button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    // Verificar que el botón "Clear All Favorites" está presente
    const clearAllButton = screen.getByText("Clear All Favorites");
    expect(clearAllButton).toBeInTheDocument();
  });
});
