const express = require("express");
const uploader = require("express-fileupload");
const mongoose = require("mongoose");
const errorHandling = require("../middlewares/ErrorHandling");

const gamesRoutes = require("../routes/games.routes");

class Server {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";
    this.setupDatabaseConnection();
    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  setupDatabaseConnection() {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      user: "admin",
      pass: "admin",
    });
  }

  routes() {
    this.express.use("/games", gamesRoutes);
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(uploader());
  }

  errorHandling() {
    this.express.use(errorHandling);
  }
}

module.exports = new Server().express;
