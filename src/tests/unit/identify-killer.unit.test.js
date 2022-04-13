const { BadRequest } = require("../../errors/GenericError");
const identifyKiller = require("../../services/IdentifyKiller");

describe("Success cases", () => {
  it("Should return the player who was killed and the killer in the provided line", () => {
    const line = "2:11 Kill: 2 4 6: Dono da Bola killed Zeh by MOD_ROCKET";

    const { killer, killed } = identifyKiller.execute(line);

    expect(killer).toBe("Dono da Bola");
    expect(killed).toBe("Zeh");
  });
});

describe("Error cases", () => {
  it("Should throw an error if the character 'Kill: ' is not in the line", () => {
    const line = "2:11 2 4 6: Dono da Bola killed Zeh by MOD_ROCKET";

    expect(() => identifyKiller.execute(line)).toThrowError(BadRequest);
    expect(() => identifyKiller.execute(line)).toThrow(
      "The .log file provided is not correctly formatted."
    );
  });

  it("Should throw an error if the character ': ' is not in the right place", () => {
    const line = "2:11 Kill: 2 4 6 Dono da Bola killed Zeh by MOD_ROCKET";

    expect(() => identifyKiller.execute(line)).toThrowError(BadRequest);
    expect(() => identifyKiller.execute(line)).toThrow(
      "The .log file provided is not correctly formatted."
    );
  });

  it("Should throw an error if the character ' by ' is not in the line", () => {
    const line = "2:11 2 4 6: Dono da Bola killed Zeh MOD_ROCKET";

    expect(() => identifyKiller.execute(line)).toThrowError(BadRequest);
    expect(() => identifyKiller.execute(line)).toThrow(
      "The .log file provided is not correctly formatted."
    );
  });

  it("Should throw an error if the line contains only one player", () => {
    const line = "2:11 Kill: 2 4 6: Dono da Bola killed by MOD_ROCKET";

    expect(() => identifyKiller.execute(line)).toThrowError(BadRequest);
    expect(() => identifyKiller.execute(line)).toThrow(
      "The .log file provided is not correctly formatted."
    );
  });
});
