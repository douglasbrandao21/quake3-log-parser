const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
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
}, {
    versionKey: false
})

module.exports = mongoose.model("Game", GameSchema);