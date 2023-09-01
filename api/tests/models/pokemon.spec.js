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

      // Add more tests for other fields as needed...
    });

    // describe('Associations', () => {
    //   it('should have a many-to-many relationship with Type', async () => {
    //     const electricType = await Type.create({ name: 'Electric' });
    //     const pikachu = await Pokemon.create({ name: 'Pikachu' });

    //     await pikachu.addType(electricType);

    //     const associatedTypes = await pikachu.getTypes();
    //     expect(associatedTypes).to.include(electricType);
    //   });

    //   // Add more association tests as needed...
    // });
  });

  describe("Type model", () => {
    beforeEach(() => Type.sync({ force: true }));

    describe("Validators", () => {
      it("should throw an error if name is null", (done) => {
        Type.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Type.create({ name: "Water" });
      });

      // Add more tests for other fields as needed...
    });

    // Add association tests if there are any...
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

    // Add association tests if there are any...
  });

  describe("Favorite model", () => {
    beforeEach(() => Favorite.sync({ force: true }));

    describe("Validators", () => {
      it("should work with valid values", () => {
        Favorite.create({ name: "Pikachu", userId: "1" });
      });

      // Add more tests for other fields as needed...
    });

    describe("Associations", () => {
      it("should belong to a User", async () => {
        const user = await User.create({
          email: "otherUser@example.com",
          password: "password123",
          id: userId,
          firstName: "Jhon",
          lastName: "Rogers"
        });
        const favorite = await Favorite.create({
          name: "Pikachu",
          userId: user.id,
        });

        expect(favorite.userId).to.equal(user.id);
      });
    });
  });
});
