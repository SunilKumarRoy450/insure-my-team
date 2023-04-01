const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose
    .connect(
      `mongodb://insure:insure@ac-kqwrvav-shard-00-00.xuzlpjp.mongodb.net:27017,ac-kqwrvav-shard-00-01.xuzlpjp.mongodb.net:27017,ac-kqwrvav-shard-00-02.xuzlpjp.mongodb.net:27017/?ssl=true&replicaSet=atlas-9lne98-shard-0&authSource=admin&retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log(`Connected to DataBase`))
    .catch((error) => console.log({ msg: error }));
};
module.exports = connectDB;
