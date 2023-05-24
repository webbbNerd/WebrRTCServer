const mongoose = require("mongoose");

const DB = () => {
  const db =
    "mongodb+srv://utkarshprofac:OO64F6J97tlWa51L@cluster0.fm0m5br.mongodb.net/rtcData?retryWrites=true&w=majority";

  mongoose
    .connect(
      db
      //     ,
      //     {
      //   useNewUrlParser: true,
      //   useCreateIndex: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: false,
      // }
    )
    .then(() => {
      console.log("Database Connection successfull");
    })
    .catch((err) => {
      console.log(err, "Database Connection failed");
    });
};

module.exports = DB;
