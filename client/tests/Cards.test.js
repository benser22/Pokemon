import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Card from "../components/Card/Card";
import "@testing-library/jest-dom/extend-expect";

describe("Card Component", () => {
  const mockCardData = {
    id: 1,
    name: "Rick Sanchez",
    image: "https://example.com/rick.png",
  };

  test("renders the Card component with correct data", () => {
    render(
      <Router>
        <Card
          element={mockCardData}
          onClose={jest.fn()}
          isFavorite={false}
          AddToFavorites={jest.fn()}
          RemoveFromFavorites={jest.fn()}
          isArrayFavorites={false}
        />
      </Router>
    );

    // Verificamos que los elementos de la tarjeta se muestren correctamente
    const titleElement = screen.getByText(`${mockCardData.id} - ${mockCardData.name}`);
    const imageElement = screen.getByAltText("character R&M");

    expect(titleElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", mockCardData.image);
  });

  test("calls AddToFavorites when the heart icon is clicked and isFavorite is false", () => {
    const AddToFavoritesMock = jest.fn();
    render(
      <Router>
        <Card
          element={mockCardData}
          onClose={jest.fn()}
          isFavorite={false}
          AddToFavorites={AddToFavoritesMock}
          RemoveFromFavorites={jest.fn()}
          isArrayFavorites={false}
        />
      </Router>
    );

    // Simulamos hacer clic en el ícono del corazón
    const heartIcon = screen.getByTestId("heart-icon");
    fireEvent.click(heartIcon);

    // Verificamos que la función AddToFavorites se haya llamado con los datos de la tarjeta
    expect(AddToFavoritesMock).toHaveBeenCalledWith(mockCardData);
  });

  test("calls RemoveFromFavorites when the heart icon is clicked and isFavorite is true", () => {
    const RemoveFromFavoritesMock = jest.fn();
    render(
      <Router>
        <Card
          element={mockCardData}
          onClose={jest.fn()}
          isFavorite={true}
          AddToFavorites={jest.fn()}
          RemoveFromFavorites={RemoveFromFavoritesMock}
          isArrayFavorites={false}
        />
      </Router>
    );

    // Simulamos hacer clic en el ícono del corazón
    const heartIcon = screen.getByTestId("heart-icon");
    fireEvent.click(heartIcon);

    // Verificamos que la función RemoveFromFavorites se haya llamado con el ID de la tarjeta
    expect(RemoveFromFavoritesMock).toHaveBeenCalledWith(mockCardData.id);
  });


  test("calls onClose when the close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <Router>
        <Card
          element={mockCardData}
          onClose={onCloseMock}
          isFavorite={false}
          AddToFavorites={jest.fn()}
          RemoveFromFavorites={jest.fn()}
          isArrayFavorites={false}
        />
      </Router>
    );

    // Simulamos hacer clic en el botón de cierre de la carta
    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    // Verificamos que onClose se haya llamado con el ID correcto
    expect(onCloseMock).toHaveBeenCalledWith(mockCardData.id);
  });

});
