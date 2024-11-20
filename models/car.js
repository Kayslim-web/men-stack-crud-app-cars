const mongoose = require('mongoose');

// 1st define the shape of the object we want to store
// in our database -- SCHEMA
const carSchema = new mongoose.Schema({
  name: String,
  isManualTransmission: Boolean,
});

// Tell Mongoose that the model we want to generate is based off
// the schema and provide a name to it
// mongoose.model("Name", schema)

const Car = mongoose.model('Car', carSchema);

// share it with the rest of your application
// module.exports = modelName
module.exports = Car;