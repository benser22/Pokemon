const { Pokemon, Type, User, Favorite, conn } = require("../../src/db.js");
const { expect } = require("chai");

const userId = "b8c67cf7-e13d-4867-8f8f-3565e948e660";

describe("Models", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Pokemon model", () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe("Validators", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });

      afterEach((done) => {
        Pokemon.destroy({ where: { name: "Pikachu" } })
          .then(() => done())
          .catch((err) => done(err));
      });
    });
  });

  describe("Type model", () => {
    beforeEach(() => Type.sync({ force: true }));

    describe("Validators", () => {
      it("should throw an error if name is null", (done) => {
        Type.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should work when it's a valid name", () => {
        Type.create({ name: "Cristal", id: 22 });
      });

      afterEach((done) => {
        Type.destroy({ where: { name: "Cristal" } })
          .then(() => done())
          .catch((err) => done(err));
      });
    });
  });

  describe("User model", () => {
    beforeEach(() => User.sync({ force: true }));

    describe("Validators", () => {
      it("should throw an error if email or password is null", (done) => {
        User.create({})
          .then(() => done(new Error("It requires a valid email and password")))
          .catch(() => done());
      });
      it("should work with valid values", () => {
        User.create({
          email: "user@example.com",
          password: "password123",
          firstName: "William",
          lastName: "Wallace",
        });
      });

      User.destroy({ where: { email: "user@example.com" } })
        .then(() => {
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("Favorite model", () => {
    beforeEach(() => Favorite.sync({ force: true }));

    describe("Validators", () => {
      it("should work with valid values", () => {
        Favorite.create({ name: "Pikachu", userId: "1" });
      });
    });

    describe("Associations", () => {
      it("should belong to a User", async () => {
        const user = await User.create({
          email: "otherUser@example.com",
          password: "password123",
          id: userId,
          firstName: "Freddie",
          lastName: "Mercury",
        });
        const favorite = await Favorite.create({
          name: "Pikachu",
          userId: user.id,
        });

        expect(favorite.userId).to.equal(user.id);

        afterEach((done) => {
          Pokemon.destroy({ where: { name: "Pikachu" } })
            .then(() => done())
            .catch((err) => done(err));
        });
        afterEach((done) => {
          Favorite.destroy({ where: { name: "Pikachu" } })
            .then(() => done())
            .catch((err) => done(err));
        });
      });
    });
  });
});
