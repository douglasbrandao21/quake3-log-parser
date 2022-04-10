const express = require("express");

const GameController = require("../controllers/GameController");

const router = express.Router();

router.get("/games", GameController.index);
router.get("/games/:id", GameController.show);
router.post("/games", GameController.store);

module.exports = router;
