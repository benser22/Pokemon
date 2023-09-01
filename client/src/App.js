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
  // Obtener la ubicación actual usando useLocation
  const location = useLocation();
  // Verificar si la ruta es "/"
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

/*
        <div className="App">
      {location.pathname !== "/" && (
        <Nav
          onSearch={onSearch}
          userData={userData}
          data-testid="nav-component"
        />
      )}
      <Routes>
        <Route
          data-testid="form-component"
          path="/"
          element={<Form userData={userData} setUserData={setUserData} />}
        />
        <Route
          path="/home"
          element={
            <Home
              data-testid="home-component"
              characters={characters}
              onClose={onClose}
              handleEraseAll={handleEraseAll}
            />
          }
        />
        <Route
          data-testid="favorites-component"
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onClose={onClose}
              addFav={addFav}
              removeFav={removeFav}
            />
          }
        />
        <Route
          path="/about"
          element={<About />}
          data-testid="about-component"
        />
        <Route
          path="/detail/:id"
          element={<Detail />}
          data-testid="detail-component"
        />
        <Route
          path="*"
          element={<Error404 navigate={Navigate} />}
          data-testid="error404-component"
        />
      </Routes>
    </div>
*/
