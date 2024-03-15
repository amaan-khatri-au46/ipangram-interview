const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./routes/userRoute");
const Department = require("./routes/departmentRoute");
const Employees = require("./routes/employeeRoute");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected To db");
  } catch (error) {
    throw error;
  }
};

app.use("/api", User);
app.use("/api", Employees);
app.use("/api", Department);

app.listen(process.env.PORT, () => {
  console.log(`app started at ${process.env.PORT}`);
  connect();
});
