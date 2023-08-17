import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import About from "./components/About/About";
import LandingPage from "./components/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import { getTypes } from "./redux/actions/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes()); // Lleno la base de datos con los Types cuando se inicia el programa, utilizando redux
  }, [dispatch]);

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
