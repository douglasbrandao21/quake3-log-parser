const identifyKiller = require("./IdentifyKiller");
const identifyPlayer = require("./IdentifyPlayer");

class LogParser {
  constructor() {
    this.game = {};
    this.gamesCounter = 0;
    this.games = [];
  }

  execute(file) {
    const fileLines = file.split("\n");

    fileLines.forEach(line => {
      const isInitOfGameEvent = line.includes("InitGame:");
      const isEndOfGame = line.includes("ShutdownGame:");
      const isKillEvent = line.includes("Kill:");
      const isPlayerInfoEvent = line.includes("ClientUserinfoChanged:");

      if (isInitOfGameEvent) {
        this.game = {
          id: 0,
          total_kills: 0,
          players: [],
          kills: {},
        };

        this.gamesCounter += 1;

        this.game.id = this.gamesCounter;
      }

      if (isEndOfGame) {
        const hasGameInfo = !!this.game;

        if (hasGameInfo) this.games.push(this.game);
      }

      if (isKillEvent) {
        const { killer, killed } = identifyKiller(line);

        const killerHasSomeKill = this.game.kills[`${killed}`] > 0;
        const killedAnotherPlayer = killer != killed;

        if (killer == "<world>")
          this.game.kills[`${killed}`] = killerHasSomeKill
            ? (this.game.kills[`${killed}`] -= 1)
            : 0;
        else if (killedAnotherPlayer) this.game.kills[`${killer}`] += 1;

        this.game.total_kills += 1;
      }

      if (isPlayerInfoEvent) {
        const playerName = identifyPlayer(line);

        if (!this.game.players.includes(playerName)) {
          this.game.players.push(playerName);

          this.game.kills[playerName] = 0;
        }
      }
    });

    return this.games;
  }
}

 module.exports = LogParser;