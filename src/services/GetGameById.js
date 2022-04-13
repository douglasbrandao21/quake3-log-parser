const mongoose = require("mongoose");
const Game = require("../schemas/Game");
const { BadRequest, NotFound } = require("../errors/GenericError");

class GetGameById {
  async execute(id) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) throw new BadRequest("Please, provide a valid id.");

    const game = await Game.findById(id);

    if (game == null) throw new NotFound("Game not found.");

    return game;
  }
}

module.exports = new GetGameById();
