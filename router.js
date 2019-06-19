const express = require("express");
const router = express.Router();

const tictactoe = require("./src/controller/tictactoe");

router.get("/jogar/:partida/:player/:jogada",tictactoe.jogar);
router.get("/convidar",tictactoe.convidar);

module.exports = router;