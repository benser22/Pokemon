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
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/types", getApiType);
router.get("/:id", getPokemonById);
router.get("/name", getPokemonByName);
router.get("/", getAllPokemons);
router.post("/", postPokemons);
router.delete("/:id", deletePokemon);
router.post("/send-email", postMail);
router.get("/search/duplicated/", searchDuplicated);
module.exports = router;