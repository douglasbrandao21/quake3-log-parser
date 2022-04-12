const express = require("express");

const GameController = require("../controllers/GameController");

const router = express.Router();

router.get("", GameController.index);
router.get("/:id", GameController.show);
router.post("", GameController.store);

module.exports = router;
