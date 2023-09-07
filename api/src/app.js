const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const session = require("express-session");

require("./db.js");

const server = express();

server.name = "API";

// Importa y utiliza la librería "express-session" para gestionar las sesiones de usuario en el servidor.
server.use(
  session({
    // Establece una clave secreta para firmar las cookies de sesión.
    secret: "123456789",

    // "resave" indica si la sesión debe volver a ser guardada en la tienda de sesiones incluso si no ha habido cambios durante la solicitud.
    resave: true,

    // "saveUninitialized" indica si se debe guardar una sesión aún si no se ha inicializado (por ejemplo, no ha habido acceso a la sesión).
    saveUninitialized: true,

    // Configura las opciones de la cookie de sesión.
    cookie: {
      // Establece la duración máxima de la cookie de sesión en milisegundos.
      // En este caso, se configura para que la sesión expire después de 60 minutos (1 hora) de inactividad.
      maxAge: 60 * 60 * 600, // 60 minutos
    },
  })
);

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/pokemons", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
