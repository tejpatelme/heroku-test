const mongoose = require("mongoose");

const URI =
  "mongodb+srv://tejpatel:%24tejsneoGprojects%23@tejs-cluster.xkap6.mongodb.net/inventory?retryWrites=true&w=majority";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to Database successful.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectToDatabase };
