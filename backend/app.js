const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const path = require("path");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/messages", messageRoutes);
app.use("/api/messages/", commentRoutes);
app.use("/api/messages/", likeRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/auth", profileRoutes);

module.exports = app;
