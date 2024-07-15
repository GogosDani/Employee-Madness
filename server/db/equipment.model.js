const mongoose = require("mongoose");

const { Schema, model } = mongoose

const equipment = ({
    name: String,
    type: String,
    ammount: Number
})

module.exports = model("Equipment", equipment)