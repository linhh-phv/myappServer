const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
require("dotenv/config");

const app = express();
const server = require("http").createServer(app);

// middleware
// app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(upload.array());

// import router
app.use("/posts", require("./routes/posts/posts"));
app.use("/auth", require("./routes/auth"));

//router test
app.get("/", function (req, res) {
  res.send("<h2>API linhh.phv</h2>");
});

// connect db
const DB_URL = process.env.DB_CONNECTION;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to mongo DB"))
  .catch((err) => console.log("connect mongo DB failed", err));

// start server
const port = process.env.PORT;
server.listen(port, () => console.log("server is running on port", port));
