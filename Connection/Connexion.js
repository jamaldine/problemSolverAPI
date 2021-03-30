const mongoose = require("mongoose");
const { Mongo } = require("@accounts/mongo");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/problemSolver", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // We tell accounts-js to use the mongo connection
  const accountsMongo = new Mongo(mongoose.connection);
};
module.exports = connectDB;
