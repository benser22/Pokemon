const { Pokemon, User, conn } = require("../../src/db.js");
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");

const agent = session(app);
const userId = "b8c67cf7-e13d-4867-8f8f-3565e948e660";
const newPokemon = {
  id: 3000,
  name: "ditto",
  img: "someimage.com",
  hp: 20,
  attack: 30,
  defense: 25,
  speed: 22,
  height: 1,
  weight: 1,
  types: ["fire", "water"],
  created: true,
  imgShiny: false,
};

describe("Routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("GET /pokemons", () => {
    beforeEach(() =>
      Pokemon.sync({ force: true }).then(() =>
        Pokemon.create({
          id: 25,
          name: "Pikachu",
          img: "www.image.com",
        })
      )
    );

    it("should get 200", (done) => {
      agent
        .get("/pokemons")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    describe("DELETE /pokemons/:pokemonID", () => {
      it("should delete a Pokémon by ID and return 200", (done) => {
        agent
          .delete("/pokemons/25")
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal("Pokemon deleted successfully");
            done();
          });
      });
    });

    describe("GET /pokemons/:pokemonID", () => {
      it("should get 200 and the searched Pokémon by ID", (done) => {
        agent
          .get("/pokemons/25")
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.an("object");
            expect(res.body.name).to.equal("pikachu");
            done();
          });
      });
    });
  });

  describe("GET /pokemons/types", () => {
    it("should get 200 and an array of types", (done) => {
      agent
        .get("/pokemons/types")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("GET /pokemons/users", () => {
    it("should get 200 and an array of users", (done) => {
      agent
        .get("/pokemons/users")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("GET /user/:userId/favorites", () => {
    it("should get 200 and a valid JSON with content", (done) => {
      agent
        .get(`pokemons/user/${userId}/favorites`)
        .expect(200)
        .expect("Content-Type", /json/);
      done();
    });
  });

  describe("POST /user/:userId/favorites", () => {
    it("should add a Pokémon to the user's favorites list", (done) => {
      agent
        .post(`/pokemons/user/${userId}/favorites`)
        .send(newPokemon)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("object");
          expect(res.body.id).to.equal(newPokemon.id);
          done();
        });
    });
  });

  describe("DELETE /user/:userId/favorites/:pokemonName", () => {
    it("should delete a Pokémon to the user's favorites list", (done) => {
      agent
        .delete(`/pokemons/user/${userId}/favorites/${newPokemon.name}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("object");
          expect(res.body.id).to.equal(newPokemon.id);
          done();
        });
    });
  });
});

describe("User Registration", () => {
  describe("POST /register", () => {
    it("should create a new user and then delete it", (done) => {
      const newUser = {
        firstName: "William",
        lastName: "Wallace",
        email: "newuser@example.com",
        password: "password123",
      };

      agent
        .post("/pokemons/register")
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.contain(`${newUser.email} created successfully`);

          // Delete the user after creation
          User.destroy({ where: { email: newUser.email } })
            .then(() => {
              done();
            })
            .catch((error) => {
              done(error);
            });
        });
    });

    it("should return a 500 status code if user already exists", (done) => {
      const existingUser = {
        firstName: "William",
        lastName: "Wallace",
        email: "newuser@example.com",
        password: "password123",
      };

      agent.post("pokemons/register").send(existingUser).expect(500);
      done();
    });

    afterEach((done) => {
      User.destroy({ where: { email: "user@example.com"} })
        .then(() => done())
        .catch((err) => done(err));
    });
    afterEach((done) => {
      User.destroy({ where: { email: "otherUser@example.com"} })
        .then(() => done())
        .catch((err) => done(err));
    });

  });
});

