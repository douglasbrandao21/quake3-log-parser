const { BadRequest } = require("../errors/GenericError");

class IdentifyPlayer {
  execute(line) {
    // "\\" Is the way that we represent the "\" character inside a string
    const initialCharacter = "n\\";
    const finalCharacter = "\\t\\";

    const initialIndex = line.indexOf(initialCharacter);
    const finalIndex = line.indexOf(finalCharacter);

    if (initialIndex != -1 && finalIndex != -1) {
      // We need to skip the \n characters (two caracters)
      const playerName = line.substring(initialIndex + 2, finalIndex);

      if (playerName.toLowerCase().includes("killed"))
        throw new BadRequest(
          "The .log file provided contains at least one player with 'killed' in his name and that is not allowed."
        );

      return playerName;
    }

    throw new BadRequest(
      "The .log provided has one or more lines incorrectly formatted."
    );
  }
}

module.exports = new IdentifyPlayer();
