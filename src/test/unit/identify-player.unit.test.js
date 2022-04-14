const identifyPlayer = require("../../services/IdentifyPlayer");
const { BadRequest } = require("../../errors/GenericError");

describe("Success cases", () => {
  it("Should return the new player in the current line", () => {
    const line =
      " 20:34 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\xian/default\\hmodel\\xian/default\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0";

    const player = identifyPlayer.execute(line);

    expect(player).toBe("Isgalamido");
  });
});

describe("Error cases", () => {
  it("Should throw an error if character '\\n' is not in the line", () => {
    const line =
      " 20:34 ClientUserinfoChanged: 2 Isgalamido\\t\\0\\model\\xian/default\\hmodel\\xian/default\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0";

    expect(() => identifyPlayer.execute(line)).toThrowError(BadRequest);
    expect(() => identifyPlayer.execute(line)).toThrow(
      "The .log provided has one or more lines incorrectly formatted."
    );
  });

  it("Should throw an error if character '\\t\\' is not in the line", () => {
    const line =
      " 20:34 ClientUserinfoChanged: 2 n\\Isgalamido\\model\\xian/default\\hmodel\\xian/default\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0";

    expect(() => identifyPlayer.execute(line)).toThrowError(BadRequest);
    expect(() => identifyPlayer.execute(line)).toThrow(
      "The .log provided has one or more lines incorrectly formatted."
    );
  });

  it("Should throw an error if player has the word 'killed' in his name.", () => {
    const line =
      " 20:34 ClientUserinfoChanged: 2 n\\Isgalamido Killed\\t\\0\\model\\xian/default\\hmodel\\xian/default\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0";

    expect(() => identifyPlayer.execute(line)).toThrowError(BadRequest);
    expect(() => identifyPlayer.execute(line)).toThrow(
      "The .log file provided contains at least one player with 'killed' in his name and that is not allowed."
    );
  });
});
