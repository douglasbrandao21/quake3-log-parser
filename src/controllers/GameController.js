const LogParser = require("../services/LogParser");
const Game = require("../schemas/Game");
const mongoose = require("mongoose");

class GameController {
  async index(request, response) {
    try {
      const games = await Game.find();

      return response.json(games);
    } catch (error) {
      console.log(error);

      return response.status(500).json({
        message: "Something went wrong. Try again later, please.",
      });
    }
  }

  async show(request, response) {
    try {
      const gameId = request.params.id;
      const isValidId = mongoose.Types.ObjectId.isValid(gameId);

      if (!isValidId)
        return response
          .status(400)
          .json({ message: "Please, provide a valid id." });

      const game = await Game.findById(gameId);

      if (game == null)
        return response.status(404).json({
          message: "Game not found.",
        });

      return response.json(game);
    } catch (error) {
      console.log(error);

      return response.status(500).json({
        message: "Something went wrong. Try again later, please.",
      });
    }
  }

  async store(request, response) {
    try {
      const hasFileUploaded =
        request.files != null && request.files.log != null;

      if (hasFileUploaded) {
        const file = request.files.log;
        const fileNameSplited = file.name.split(".");
        const fileExtension = fileNameSplited[fileNameSplited.length - 1];

        if(fileExtension == "log" && file.mimetype == "text/plain") {
          const fileContent = file.data.toString("utf8");

          const parser = new LogParser();
  
          var games = parser.execute(fileContent);
  
          games = await Game.insertMany(games);
  
          return response.json(games);
        }

        return response.status(400).json({
          message: "Provide a file with .log extension, please."
        });
      }
      else {
        return response.status(400).json({
          message: "File with the games not provided."
        });
      }

    } catch (error) {
      console.log(error);

      return response.status(500).json({
        message: "Something went wrong. Try again later, please.",
      });
    }
  }
}

module.exports = new GameController();
