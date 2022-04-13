const { BadRequest } = require("../errors/GenericError");
const processLogFile = require("./ProcessLogFile");

class ConvertFileToGames {
  execute(file) {
    const fileNameSplited = file.name.split(".");
    const fileExtension = fileNameSplited[fileNameSplited.length - 1];

    if (fileExtension == "log" && file.mimetype == "text/plain") {
      const fileContent = file.data.toString("utf8");

      var games = processLogFile.execute(fileContent);

      return games;
    }

    throw new BadRequest("Provide a valid log file, please.");
  }
}

module.exports = new ConvertFileToGames();
