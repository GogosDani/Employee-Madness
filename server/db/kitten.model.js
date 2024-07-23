const mongoose = require("mongoose")
const { Schema, model } = mongoose

const kitten = new Schema({
    name: String,
    weight: Number,
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }
})

module.exports = model("Kitten", kitten)
