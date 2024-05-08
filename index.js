const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const rootRouter=require("./routes/index")


app.use(cors());
dotenv.config();

//! Database Connection :
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URL);
    console.log("Database Connection Successful");
  } catch (err) {
    console.log(err);
  }
};

app.use(express.json());

//! Initialise root Router :
app.use("/api/v1/",rootRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT}`);
  connectDB();
});

