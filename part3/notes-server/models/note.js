const mongoose = require("mongoose");
require("dotenv").config();
const config = require("../utils/config"); //giving root for importing MONGODB_URI from config

//const url = process.env.MONGODB_URI;
const url = config.MONGODB_URI; //using MONGODB_URI variable from config to use different url for different purpose

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
// error handling via schema
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  //content: String,
  date: Date,
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//to remove -id,--v
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
