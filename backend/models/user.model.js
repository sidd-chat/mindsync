const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {type: String},
  email: {type: String},
  password: {type: String},
  createdOn: {type: Date, default: new Date().getTime()},
});

// A model in Mongoose is an object that represents a MongoDB collection and provides methods to interact with it.
// Think of a model as a blueprint for working with data in a specific collection using CRUD operations.
// With a model, you can:
// Create (.save())
// Read (.find())
// Update (.updateOne())
// Delete (.deleteOne())
module.exports = mongoose.model("User", userSchema);
// The name of the MongoDB collection, "User" is automatically made lowercase and plural -> "users"
// userSchema defines the structure of the documents in the collection