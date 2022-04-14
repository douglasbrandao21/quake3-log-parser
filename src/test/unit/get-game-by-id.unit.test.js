const Game = require("../../schemas/Game");
const { generateGame } = require("../../utils/generateGame");
const GetGameById = require("../../services/GetGameById");
const { BadRequest, NotFound } = require("../../errors/GenericError");


describe("Success cases", () => {
  it("Should find a game by id if it exists", async () => {
    const generatedGame = generateGame();

    await Game.create(generatedGame);

    var findedGame = await GetGameById.execute(generatedGame._id);

    expect(findedGame._id.toString()).toEqual(generatedGame._id);
  });
});

describe("Errors cases", () => {
  it("Should not search for a game if the provided id is not valid", async () => {
    try {
      await GetGameById.execute("INVALID ID");
    } catch (error) {
      expect(error.message).toBe("Please, provide a valid id.");
      expect(error).toBeInstanceOf(BadRequest);
    }
  });

  it("Should not return a game if there's no one with the correspondent id", async () => {
    try {
      const generatedGame = generateGame();

      await GetGameById.execute(generatedGame._id);
    } catch (error) {
      expect(error.message).toBe("Game not found.");
      expect(error).toBeInstanceOf(NotFound);
    }
  });
});
