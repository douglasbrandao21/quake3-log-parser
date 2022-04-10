const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    total_kills: {
        type: Number,
        required: true
    },
    players: {
        type: Array,
        required: true
    },
    kills: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    }
});

module.exports = mongoose.model("Game", GameSchema);