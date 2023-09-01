import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importa jest-dom para tener toBeInTheDocument
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About/About';

describe('About component', () => {
  test('renders the title "About me"', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Verifica que el título "About me" esté presente
    const aboutTitle = screen.getByText(/About me/i);
    expect(aboutTitle).toBeInTheDocument();
  });

  test('renders the profile image with the correct "alt" attribute', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Verifica que la imagen de perfil esté presente y tenga el atributo "alt" correcto
    const profileImage = screen.getByAltText(/Profile/i);
    expect(profileImage).toBeInTheDocument();
  });

  test('renders the description text', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Verifica que el texto de descripción esté presente
    const descriptionText = screen.getByText(/Hello! I'm Benjamin, a Henry student.../i);
    expect(descriptionText).toBeInTheDocument();
  });

  test('renders the home link with the correct "href" attribute', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Verifica que el enlace a la página de inicio esté presente y tenga el atributo "href" correcto
    const homeLink = screen.getByTestId('home-link');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.href).toContain('/home');
  });
});
