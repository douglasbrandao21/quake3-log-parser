const express = require("express");

const router = require("./router");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.express.use(router);
  }
}

module.exports = new App().express;
