const mongoose  = require("mongoose");

const DbConnectFunction = async () => {
  await mongoose.connect(
    "mongodb+srv://vibhanshusharma89636:4JSnVRHZDNf6hh5H@database.ackzc.mongodb.net/Backend"
  );

  console.log("dbsucess");
};
module.exports = DbConnectFunction;
