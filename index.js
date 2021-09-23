const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://tanay:password@mongo:27017/?authSource=admin")
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.send("hello there ");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running");
});
