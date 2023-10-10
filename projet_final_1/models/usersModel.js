// File: ./models/somemodel.js

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const usersModelSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    _id: {type: Number, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    token: String,
    creationDate: { type: Date, default: Date.now() },
    age: { type: Number, min: 18, max: 65, required: true },
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("users", usersModelSchema);