const express = require("express");

const GameController = require("../controllers/GameController");

const router = express.Router();

router.get("/games", GameController.index);
router.get("/games/:id", GameController.show);

module.exports = router;
