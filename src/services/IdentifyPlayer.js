function IdentifyPlayer(line) {
  // "\\" Is the way that we represent the "\" character inside a string
  const initialCharacter = "n\\";
  const finalCharacter = "\\t\\";

  // We need to skip the \n characters (two caracters)
  const initialIndex = line.indexOf(initialCharacter) + 2;
  const finalIndex = line.indexOf(finalCharacter);

  const playerName = line.substring(initialIndex, finalIndex);

  return playerName;
}

module.exports = IdentifyPlayer;
