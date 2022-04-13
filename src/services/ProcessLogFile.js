const { BadRequest } = require("../errors/GenericError");
const identifyKiller = require("./IdentifyKiller");
const identifyPlayer = require("./IdentifyPlayer");

class ProcessLogFile {
  execute(file) {
    const games = [];
    const fileLines = file.split("\n");

    var game = {};

    fileLines.forEach((line) => {
      const isInitOfGameEvent = line.includes("InitGame:");
      const isEndOfGame = line.includes("ShutdownGame:");
      const isKillEvent = line.includes("Kill:");
      const isPlayerInfoEvent = line.includes("ClientUserinfoChanged:");

      if (isInitOfGameEvent) {
        game = {
          total_kills: 0,
          players: [],
          kills: {},
        };
      }

      if (isEndOfGame) {
        const hasGameInfo = !!game;

        if (hasGameInfo) {
          games.push(game);
        }
      }

      if (isKillEvent) {
        const { killer, killed } = identifyKiller.execute(line);

        const allPlayersInGame = [...game.players, "<world>"];

        const playersInGame =
          allPlayersInGame.includes(killer) &&
          allPlayersInGame.includes(killed) &&
          killed != "<world>";

        if (playersInGame) {
          const killerHasSomeKill = game.kills[`${killed}`] > 0;
          const killedAnotherPlayer = killer != killed;

          if (killer == "<world>")
            game.kills[`${killed}`] = killerHasSomeKill
              ? (game.kills[`${killed}`] -= 1)
              : 0;
          else if (killedAnotherPlayer) game.kills[`${killer}`] += 1;

          game.total_kills += 1;
        } else
          throw new BadRequest("The .log file provided has kills with errors.");
      }

      if (isPlayerInfoEvent) {
        const playerName = identifyPlayer.execute(line);

        if (!game.players.includes(playerName)) {
          game.players.push(playerName);

          game.kills[playerName] = 0;
        }
      }
    });

    return games;
  }
}

module.exports = new ProcessLogFile();
