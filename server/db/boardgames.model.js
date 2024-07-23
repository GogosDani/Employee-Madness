const mongoose = require("mongoose")

const { Schema, model } = mongoose

const board = new Schema({
    name: String,
    maxPlayers: Number
})

module.exports = model("Board", board)