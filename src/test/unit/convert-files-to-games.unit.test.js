const convertFileToGames = require("../../services/ConvertFileToGames");

const file = {
  name: "file.log",
  mimetype: "text/plain",
  data: "file data",
};

describe("Success cases", () => {
  it("Should convert a file into an array of games", () => {
    const games = convertFileToGames.execute(file);

    expect(games).toStrictEqual([]);
  });
});

describe("Errors cases", () => {
  it("Should not convert a file if the extension is different of .log", async () => {
    file.name = "file.png";

    expect(() => convertFileToGames.execute(file)).toThrow(
      "Provide a valid log file, please."
    );
  });

  it("Should not convert a file if the mimetype is different of text/plain", async () => {
    file.mimetype = "image/jpeg";

    expect(() => convertFileToGames.execute(file)).toThrow(
      "Provide a valid log file, please."
    );
  });
});
