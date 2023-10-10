// File: ./models/somemodel.js

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const characteristicsModelSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    _id: {type: Number, required: true}, //key
    characterName: {type: String, required: true}, //secondary_key
    weigth: {type: Number, required: true},
    runSpeed: {type: Number, required: true},
    jumpHeigth: {type: Number, required: true},
    creationDate: { type: Date, default: Date.now() }
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("characteristics", characteristicsModelSchema);