// Nav.test.js
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import "@testing-library/jest-dom/extend-expect";

// Simulamos el componente de búsqueda porque lo está usando 'Nav'
jest.mock("../components/SearchBar/SearchBar", () => () => <div data-testid="search-bar" />);

describe("Nav component", () => {
  it("should render without errors", () => {
    render(
      <MemoryRouter>
        <Nav userData={{ email: "example@example.com" }} />
      </MemoryRouter>
    );
  });

  it("should contain links to Favorites, About, and a SearchBar", () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <Nav userData={{ email: "example@example.com" }} />
      </MemoryRouter>
    );

    // Verificar que existan enlaces a Favoritos y About
    const favoritesLink = getByText("Favorites");
    const aboutLink = getByText("About");
    expect(favoritesLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    // Verificar que exista el componente SearchBar
    const searchBar = getByTestId("search-bar");
    expect(searchBar).toBeInTheDocument();
  });
});
