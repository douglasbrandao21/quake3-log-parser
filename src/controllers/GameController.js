const LogParser = require("../services/LogParser");

class GameController {
    async index(request, response) {
        const logParser = new LogParser(process.env.LOG_PATH);

        const games = await logParser.execute();

        return response.json(games);
    }

    async show(request, response) {
        const gameId = request.params.id;

        const logParser = new LogParser(process.env.LOG_PATH);

        const games = await logParser.execute();

        const game = games.filter(game => game.id == gameId);

        return response.json(game);
    }
}

module.exports = new GameController();