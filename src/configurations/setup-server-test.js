
const mongoose = require("mongoose");

beforeAll(() => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
  });
});

afterAll(async () => {
  mongoose.connection.close();
});