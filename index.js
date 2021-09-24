const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// to retry connecting in case mongo has not initialized properly. // depends_on doesn't guarantee the order everytime
const connectRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((e) => {
      console.log(e);
      console.log("TRYING.....");
      setTimeout(connectRetry, 5000);
    });
};

connectRetry();

app.get("/", (req, res) => {
  res.send("hello there ");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running");
});
