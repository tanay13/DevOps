const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
let RedisStore = require("connect-redis")(session);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const postRouter = require("./routes/postRoute");

const userRouter = require("./routes/userRoute");
const { populate } = require("./models/postModel");

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

// To allow some of the nginx headers
app.enable("trust proxy");

app.use(cors({}));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 1000 * 30,
    },
  })
);

app.get("/api/v1", (req, res) => {
  res.send("hello there ");
  console.log("Node-app");
});

app.use("/api/v1/posts", postRouter);

app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
