const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getPokemonById = require("../controllers/getPokemonById");
const getApiType = require("../controllers/getApiType");
const getPokemonByName = require("../controllers/getPokemonByName");
const getAllPokemons = require("../controllers/getAllPokemons");
const postPokemons = require("../controllers/postPokemons");
const deletePokemon = require("../controllers/deletePokemonById");
const postMail = require("../controllers/postMail");
const searchDuplicated = require("../controllers/searchDuplicated");
const getFavoritesByUser = require('../controllers/getFavoritesByUser');
const getAllUsers = require('../controllers/getAllUsers');
const login = require("../controllers/login");
const postUser = require("../controllers/postUser");
const postFavoritesByUser = require('../controllers/postFavoritesByUser'); // Importa el nuevo controlador
const deleteFavoriteByUser = require("../controllers/deleteFavoriteByUser");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/types", getApiType);
router.get('/users', getAllUsers);
router.get('/user/:userId/favorites', getFavoritesByUser);
router.post('/user/:userId/favorites', postFavoritesByUser);
router.delete('/user/:userId/favorites/:pokemonName', deleteFavoriteByUser);
router.get("/login/:email&:password", login);
router.post("/login", postUser);
router.get("/name", getPokemonByName);
router.get("/:id", getPokemonById);
router.get("/", getAllPokemons);
router.post("/", postPokemons);
router.delete("/:id", deletePokemon);
router.post("/send-email", postMail);
router.get("/search/duplicated/", searchDuplicated);

module.exports = router;