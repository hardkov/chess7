const mongoose = require("mongoose");

const uri =
  "mongodb+srv://dbUser:dbUserPassword@chess7cluster.1v39d.mongodb.net/chess7?retryWrites=true&w=majority";

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
