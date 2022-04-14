
const axios = require("axios");
const Game = require("../../schemas/Game");
const { generateGame } = require("../../utils/generateGame");

const baseUrl = `http://localhost:${process.env.PORT}`

describe("Success cases", () => {
  test("Should find a game by id", async () => {
    const gameToBeReturned = generateGame();
    
    await Game.create(gameToBeReturned);

    const response = await axios.get(`${baseUrl}/games/${gameToBeReturned._id}`);

    const game = response.data;
    
    expect(response.status).toEqual(200);
    expect(game).toHaveProperty("kills");
    expect(game).toHaveProperty("players");
    expect(game).toHaveProperty("total_kills");
  
    expect(game.kills).toEqual(gameToBeReturned.kills);
  });
});

describe("Errors cases", () => {
  test("Shoud return an response 404 if a game with the provided id was not found", async () => {
    
    try {
      const wrongId = "6257e4a4b302635804a6c34b";

      await axios.get(`${baseUrl}/games/${wrongId}`);
    }
    catch(error) {
      const { response } = error;

      expect(response.status).toEqual(404);
      expect(response.data.message).toEqual("Game not found.")
    }
  });

  test("Should return an response 400 when a invalid id be provided", async () => {
    try {
      await axios.get(`${baseUrl}/games/invalidId`);
    }
    catch(error) {
      const { response } = error;

      expect(response.status).toEqual(400);
      expect(response.data.message).toEqual("Please, provide a valid id.")
    }
  })
});
