function generateGame() {
  return {
    _id: "62563448953c3827d738f2ac",
    total_kills: 4,
    players: ["Dono da Bola", "Mocinha", "Isgalamido", "Zeh"],
    kills: {
      "Dono da Bola": 0,
      Mocinha: 0,
      Isgalamido: 1,
      Zeh: 0,
    },
  };
}

function generateGameWithoutId() {
  return {
    total_kills: 4,
    players: ["Dono da Bola", "Mocinha", "Isgalamido", "Zeh"],
    kills: {
      "Dono da Bola": 0,
      Mocinha: 0,
      Isgalamido: 1,
      Zeh: 0,
    },
  };
}

module.exports = {
  generateGame,
  generateGameWithoutId,
};
