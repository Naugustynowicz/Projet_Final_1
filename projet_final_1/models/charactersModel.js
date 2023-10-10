// File: ./models/somemodel.js

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const charactersModelSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    _id: {type: Number, required: true}, //key
    characterName: {type: String, required: true},
    moveset: {type: String, required: true}, //secondary key
    charateristics: {type: String, required: true}, //secondary key
    creationDate: { type: Date, default: Date.now() }
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("characters", charactersModelSchema);