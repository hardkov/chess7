const mongoose = require("mongoose");

const uri = process.env.MONGODB;

const connect = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err));
};

const disconnect = () => {
  return mongoose.connection.close();
};

module.exports = { connect, disconnect };
