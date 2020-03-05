require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const listRouter = require("./route/list-router");

const app = express();

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  error => {
    if (error) {
      console.log(error);
    } else {
      console.log("connected to mongodb");
    }
  }
);

app.use(bodyParser.json());
app.use(cors());
app.use("/", listRouter);

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
