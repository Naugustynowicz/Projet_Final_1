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
  //const Schema = mongoose.Schema;

  // const characteristicsModelSchema = new Schema({
  //   //_id: Schema.Types.ObjectId,
  //   _id: {type: Number, required: true}, //key
  //   characterName: {type: String, required: true}, //secondary_key
  //   weigth: {type: Number, required: true},
  //   runSpeed: {type: Number, required: true},
  //   jumpHeigth: {type: Number, required: true},
  //   creationDate: { type: Date, default: Date.now() }
  // });

  // Compile model from schema
  //const characteristicsModel = mongoose.model("characteristics", characteristicsModelSchema);
  const characteristicsModel = require("./models/characteristicsModels");


  // Create an instance of model SomeModel
  const test1Instance = new characteristicsModel({ _id: 1, userName: "Test1", password: "test1", age: 18 });
  await test1Instance.save();
  //create another instance
  await characteristicsModel.create({ _id: 2, userName: "Test2", password: "test2", age: 18 });

}
