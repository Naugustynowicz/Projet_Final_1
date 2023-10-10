// File: ./models/somemodel.js

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const movesetModelSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    _id: {type: Number, required: true}, //key
    characterName: {type: String, required: true}, //secondary key
    moveName: {type: String, required: true},
    damage: {type: String, required: true},
    startupFrames: {type: Number, required: true},
    activeFrames: {type: Number, required: true},
    endFrames: {type: Number, required: true},
    creationDate: { type: Date, default: Date.now() }
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("moveset", movesetModelSchema);