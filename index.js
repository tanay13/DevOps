const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const postRouter = require("./routes/postRoute");

const userRouter = require("./routes/userRoute");

const app = express();

app.use(express.json());

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

app.use("/api/v1/posts", postRouter);

app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running");
});
