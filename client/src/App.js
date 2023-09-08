import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CreatePokemon from "./Pages/CreatePokemon/CreatePokemon";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Error404 from "./components/Error404/Error404";
import Details from "./Pages/Details/Details";
import Favorites from "./components/Favorites/Favorites";

function App() {
  // Obtengo la ubicación actual usando useLocation
  const location = useLocation();
  // Verifico si la ruta es "/" o la del Error404 para no mostrar la nav
  const notNav = location.pathname === "/" || location.pathname === "/error404";    

  return (
    <div className="App">
      {/* Renderizar la Navbar solo si no es la página de inicio */}
      {!notNav && <Navbar />}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create" element={<CreatePokemon />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;