const mongoose = require("mongoose");

const { Schema, model } = mongoose

const Brand = new Schema({
    name: String
})

module.exports = mongoose.model("Brand", Brand)