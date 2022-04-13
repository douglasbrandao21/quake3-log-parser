const mongoose = require("mongoose");
const Game = require("../../schemas/Game");

describe("Success cases", () => {
  beforeAll(() => {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    });
  });

  afterAll(async () => {
    await Game.deleteMany({});

    mongoose.connection.close();
  });

  it("Should do something", async () => {
    expect(1 + 1).toBe(2);
  });
});

describe("Errors cases", () => {
  test("Should do something", () => {
    expect(1 + 1).toBe(2);
  });
});
