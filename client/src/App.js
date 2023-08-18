import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import CreatePokemon from "./Pages/CreatePokemon/CreatePokemon";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Error404 from "./components/Error404/Error404";


function App() {
  // Obtener la ubicación actual usando useLocation
  const location = useLocation();

  // Verificar si la ruta es "/"
  const isHomePage = location.pathname === "/";

  return (
    <div className="App">
      {/* Renderizar la Navbar solo si no es la página de inicio */}
      {!isHomePage && <Navbar />}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreatePokemon />} />
        <Route path="*" element={Error404} />
      </Routes>
    </div>
  );
}

export default App;

/*
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/pokemons' element={<Home />} />
        <Route path='/pokemons/:id' element={<Details />} />
        <Route path='/create' element={<CreateForm />} />
        <Route path='/play' element={<HTPGame />} />
        <Route path='*' element={<Error />} />
*/
