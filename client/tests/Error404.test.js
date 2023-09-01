import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Error404 from "../components/Error404/Error404";
import "@testing-library/jest-dom/extend-expect";

describe("Error404 component", () => {
  test("renders error message and home button", () => {
    // Renderiza el componente con el MemoryRouter para las pruebas de enrutamiento
    render(
      <MemoryRouter>
        <Error404 />
      </MemoryRouter>
    );

    // Verifica que el mensaje de error esté presente
    const errorMessage = screen.getByText(/Página no encontrada/i);
    expect(errorMessage).toBeInTheDocument();

    // Verifica que el botón de inicio esté presente
    const homeButton = screen.getByRole("button");
    expect(homeButton).toBeInTheDocument();

    // Simula un clic en el botón de inicio
    fireEvent.click(homeButton);

    // Verifica que el enrutamiento se haya realizado correctamente
    expect(window.location.pathname).toBe("/");
  });
});
