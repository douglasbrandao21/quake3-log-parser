
const mongoose = require("mongoose");
const server = require("../server/server");
const Game = require("../schemas/Game");

beforeAll(() => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
  });
});

afterAll(async () => {
  mongoose.connection.close();
});

afterEach(async () => {
  await Game.deleteMany({});
})