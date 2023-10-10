// Import the mongoose module
const mongoose = require("mongoose");

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDb = "mongodb://127.0.0.1/projet_final_1";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDb);


  // Require Mongoose
  // const mongoose = require("mongoose");

  // Define a schema
  // const Schema = mongoose.Schema;

//   const charactersModelSchema = new Schema({
//     //_id: Schema.Types.ObjectId,
//     _id: {type: Number, required: true}, //key
//     characterName: {type: String, required: true},
//     moveset: {type: String, required: true}, //secondary key
//     charateristics: {type: String, required: true}, //secondary key
//     creationDate: { type: Date, default: Date.now() }
// });

  // Compile model from schema
  // const usersModel = mongoose.model("users", usersModelSchema);
  const charactersModel = require("../models/charactersModel");


  // Create an instance of model SomeModel
  const test1Instance = new charactersModel({ _id: 1, characterName: "Mario", moveset: "1", charateristics: "1" });
  await test1Instance.save();
  //create another instance
  await charactersModel.create({ _id: 2, characterName: "Link", moveset: "2", charateristics: "2" });

}
