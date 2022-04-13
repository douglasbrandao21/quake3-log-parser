const fileSystem = require("fs");
const { BadRequest } = require("../../errors/GenericError");
const processLogFile = require("../../services/ProcessLogFile");

describe("Success cases", () => {
  it("Should read the file correctly and return the objects with the games", () => {
    const file = fileSystem.readFileSync("assets/1-games.log", "utf-8");

    const games = processLogFile.execute(file);

    games.forEach((game) => {
      expect(game).toHaveProperty("kills");
      expect(game).toHaveProperty("players");
      expect(game).toHaveProperty("total_kills");

      expect(game.players.length).toBeGreaterThan(0);
      expect(game.total_kills).toBeGreaterThanOrEqual(0);
      expect(Object.keys(game.kills).length).toEqual(game.players.length);
    });

    expect(games).toHaveLength(20);
  });

  it("Should remove one kill from player if his was killed by <world>", () => {
    const file = fileSystem.readFileSync("assets/0-game.log", "utf-8");

    const games = processLogFile.execute(file);

    expect(games).toHaveLength(1);
    expect(games[0].kills["Isgalamido"]).toEqual(1);
    expect(games[0].total_kills).toEqual(6);
  });

  it("Should desconsider a game if it starts and not ends", () => {
    const file = fileSystem.readFileSync(
      "assets/2-games-without-end.log",
      "utf-8"
    );

    const games = processLogFile.execute(file);

    expect(games).toHaveLength(1);
  });
});

describe("Error cases", () => {
  it("Should throw an error if killer readed is not in the list of players", () => {
    const file = fileSystem.readFileSync(
      "assets/3-games-killer-outside-players.log",
      "utf-8"
    );

    expect(() => processLogFile.execute(file)).toThrowError(BadRequest);
    expect(() => processLogFile.execute(file)).toThrow(
      "The .log file provided has kills with errors."
    );
  });

  it("Should throw an error if killed readed is not in the list of players", () => {
    const file = fileSystem.readFileSync(
      "assets/4-games-killed-outside-players.log",
      "utf-8"
    );

    expect(() => processLogFile.execute(file)).toThrowError(BadRequest);
    expect(() => processLogFile.execute(file)).toThrow(
      "The .log file provided has kills with errors."
    );
  });

  it("Should throw an error if <world> be killed", () => {
    const file = fileSystem.readFileSync(
      "assets/5-games-world-killed.log",
      "utf-8"
    );

    expect(() => processLogFile.execute(file)).toThrowError(BadRequest);
    expect(() => processLogFile.execute(file)).toThrow(
      "The .log file provided has kills with errors."
    );
  });
});
