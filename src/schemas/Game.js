const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    _id: {
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
}, {
    versionKey: false
});

module.exports = mongoose.model("Game", GameSchema);