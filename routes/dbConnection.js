const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to Database successful.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectToDatabase };
