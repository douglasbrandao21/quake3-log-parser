const { BadRequest } = require("../errors/GenericError");
const LogParser = require("../services/LogParser");
const Game = require("../schemas/Game");

class StoreGame {
  async execute(file) {
    const fileNameSplited = file.name.split(".");
    const fileExtension = fileNameSplited[fileNameSplited.length - 1];

    if (fileExtension == "log" && file.mimetype == "text/plain") {
      const fileContent = file.data.toString("utf8");

      const parser = new LogParser();

      var games = parser.execute(fileContent);

      games = await Game.insertMany(games);

      return games;
    }

    throw new BadRequest("Provide a file with .log extension, please.");
  }
}

module.exports = new StoreGame();
