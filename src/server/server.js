const express = require("express");
const uploader = require("express-fileupload");
const mongoose = require("mongoose");

const router = require("./router");

class Server {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";
    this.setupDatabaseConnection();
    this.middlewares();
    this.routes();
  }

  setupDatabaseConnection() {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      user: "admin",
      pass: "admin",
    });
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(uploader());
  }

  routes() {
    this.express.use(router);
  }
}

module.exports = new Server().express;
