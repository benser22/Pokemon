import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Card from "../components/Card/Card";
import "@testing-library/jest-dom/extend-expect";

describe('Card component', () => {
test("renders Card component with correct title and image", () => {
  // Datos de prueba para el componente
  const mockElement = {
    id: 1,
    name: "Rick Sanchez",
    image: "https://example.com/rick.png",
  };

  render(
    <Router>
      <Card element={mockElement} />
    </Router>
  );

  // Verificamos si el título y la imagen se muestran correctamente
  const titleElement = screen.getByText(
    `${mockElement.id} - ${mockElement.name}`
  );
  const imageElement = screen.getByAltText("character R&M");

  expect(titleElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute("src", mockElement.image);
});

test("heart icon does not have the 'favorite' class initially", () => {
  // Datos de prueba para el componente
  const mockElement = {
    id: 1,
    name: "Rick Sanchez",
    image: "https://example.com/rick.png",
  };

  // Renderizamos el componente con isFavorite a false (no es favorito)
  render(
    <Router>
      <Card
        element={mockElement}
        isFavorite={false}
        AddToFavorites={jest.fn()}
        RemoveFromFavorites={jest.fn()}
      />
    </Router>
  );

  // Verificamos que el corazón no tenga la clase "favorite"
  const heartIcon = screen.getByTestId("heart-icon");
  expect(heartIcon).not.toHaveClass("favorite");
});

test("toggles favorite state when heart icon is clicked", async () => {
  // Datos de prueba para el componente
  const mockElement = {
    id: 1,
    name: "Rick Sanchez",
    image: "https://example.com/rick.png",
  };

  // Funciones de prueba simuladas
  const mockAddToFavorites = jest.fn();
  const mockRemoveFromFavorites = jest.fn();

  // Renderizamos el componente con isFavorite a false (no es favorito)
  render(
    <Router>
      <Card
        element={mockElement}
        isFavorite={false}
        AddToFavorites={mockAddToFavorites}
        RemoveFromFavorites={mockRemoveFromFavorites}
      />
    </Router>
  );

  const heartIcon = screen.getByTestId("heart-icon");

  // Simulamos hacer clic en el corazón para marcarlo como favorito
  fireEvent.click(heartIcon);

  // Verificamos que la función de agregar a favoritos haya sido llamada
  expect(mockAddToFavorites).toHaveBeenCalledTimes(1);

  // Verificamos que isFavorite se haya cambiado a true
  expect(mockAddToFavorites.mock.calls[0][0]).toEqual(mockElement);

});
});