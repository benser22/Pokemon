import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import About from "./components/About/About";
import LandingPage from "./components/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar"

function App() {
  // Cargo los types en la tabla de mi BDD cuando inicia el programa
  useEffect(() => {
    axios.get("http://localhost:3001/pokemons/types").catch((error) => {
      console.log(error.message);
    });
  }, []);

  // Obtener la ubicación actual usando useLocation
  const location = useLocation();

  // Verificar si la ruta es "/"
  const isHomePage = location.pathname === "/";

  return (
    <div className="App">
      {/* Renderizar la Navbar solo si no es la página de inicio */}
      {!isHomePage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreatePokemon />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
