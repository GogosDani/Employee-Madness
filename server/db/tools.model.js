const mongoose = require("mongoose")

const { Schema, model } = mongoose

const Tools = new Schema({
    name: String,
    weight: Number
})

module.exports = model("Tool", Tools)