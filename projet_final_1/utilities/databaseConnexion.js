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
  const Schema = mongoose.Schema;

  const usersModelSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    _id: Number,
    userName: String,
    password: String,
    creationDate: { type: Date, default: Date.now() },
    age: { type: Number, min: 18, max: 65, required: true },
  });

  // Compile model from schema
  const usersModel = mongoose.model("users", usersModelSchema);


  // Create an instance of model SomeModel
  //const test1Instance = new usersModel({ _id: 1, userName: "Test1", password: "test1", age: 18 });
  //await test1Instance.save();
  //create another instance
  //await usersModel.create({ _id: 2, userName: "Test2", password: "test2", age: 18 });

  // Access model field values using dot notation
  //console.log(test1Instance.userName); //should log 'also_awesome'

  // Change record by modifying the fields, then calling save().
  //test1Instance.userName = "test1-1";
  //await test1Instance.save();

  //console.log(test1Instance.userName);

  const Users = mongoose.model("users", usersModelSchema);

  //finding somebody
  let searchResults = await Users.find(
    { userName: "test1-1" }, //Could use regex here.
    "userName age",
  ).exec();
  console.log("searchResults : " + searchResults);

  // find all athletes that play tennis
  const query = Users.find({ userName: /test/i });
  // selecting the 'name' and 'age' fields
  query.select("userName age");
  // limit our results to 5 items
  query.limit(5);
  // sort by age
  query.sort({ age: -1 });
  // execute the query at a later time
  searchResults = await query.exec();
  console.log("searchResults2 : " + searchResults);



}
