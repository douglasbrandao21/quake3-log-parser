const LogParser = require("../services/LogParser");
const Game = require("../schemas/Game");

class GameController {
  async index(request, response) {
    // const logParser = 

    // const games = await logParser.execute();

    // return response.json(games);
  }

  async show(request, response) {
    // const gameId = request.params.id;

    // const logParser = new LogParser(process.env.LOG_PATH);

    // const games = await logParser.execute();

    // const game = games.filter((game) => game.id == gameId);

    // return response.json(game);
  }

  async store(request, response) {
    const hasFileUploaded = request.files;

    if(hasFileUploaded) {
      const fileContent = request.files.log.data.toString("utf8");
    
      const parser = new LogParser();

      const games = parser.execute(fileContent);

      const createdGames = await Game.insertMany(games);
      
      return response.json(games);
    }
  }
}

module.exports = new GameController();
