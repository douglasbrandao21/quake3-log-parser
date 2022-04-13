const { BadRequest } = require("../errors/GenericError");

class IdentifyKiller {
  execute(line) {
    const characterOfInit = line.indexOf("Kill: ");

    if (characterOfInit != -1) {
      const initialPosition = characterOfInit + 6;

      const startCharacter = line.indexOf(": ", initialPosition);
      const endCharacter = line.lastIndexOf(" by ");

      if (startCharacter != -1 && endCharacter != -1) {
        const initialIndex = startCharacter + 2;
        const finalIndex = endCharacter;

        const lineSplited = line
          .slice(initialIndex, finalIndex)
          .split(" killed ");

        const hasTwoPlayers = lineSplited.length == 2;

        if (hasTwoPlayers) {
          const killer = lineSplited[0];
          const killed = lineSplited[1];

          return { killer, killed };
        }

        throw new BadRequest(
          "The .log file provided is not correctly formatted."
        );
      }

      throw new BadRequest(
        "The .log file provided is not correctly formatted."
      );
    }

    throw new BadRequest("The .log file provided is not correctly formatted.");
  }
}

module.exports = new IdentifyKiller();
