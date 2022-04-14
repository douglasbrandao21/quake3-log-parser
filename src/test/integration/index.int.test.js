const axios = require("axios");
const Game = require("../../schemas/Game");

const {
  generateGameWithoutId,
} = require("../../utils/generateGame");

const baseUrl = `http://localhost:${process.env.PORT}`

describe("Success cases", () => {
  it("Should return all the stored games", async () => {
    await Game.insertMany([
      generateGameWithoutId(),
      generateGameWithoutId(),
      generateGameWithoutId(),
    ]);

    const response = await axios.get(`${baseUrl}/games`);
    const games = response.data;

    expect(games).toHaveLength(3);
    expect(response.status).toEqual(200);
  });
});
