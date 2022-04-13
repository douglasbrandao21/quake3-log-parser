const Game = require("../schemas/Game");
const ConvertFileToGames = require("../services/ConvertFileToGames");
const GetGameById = require("../services/GetGameById");
const { BadRequest } = require("../errors/GenericError");

class GameController {
  async index(request, response, next) {
    try {
      const games = await Game.find();

      return response.json(games);
    } catch (error) {
      next(error);
    }
  }

  async show(request, response, next) {
    try {
      const { id } = request.params;

      const game = await GetGameById.execute(id);

      return response.json(game);
    } catch (error) {
      next(error);
    }
  }

  async store(request, response, next) {
    try {
      const hasFile = request.files != null && request.files.log != null;

      if (hasFile) {
        const file = request.files.log;

        const games = await ConvertFileToGames.execute(file);

        const insertedGames = await Game.insertMany(games);

        return response.json(insertedGames);
      }

      throw new BadRequest("File with the games was not provided.");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GameController();
