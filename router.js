const express = require("express");
const router = express.Router();

const tictactoe = require("./src/controller/TicTacToeController");
const auth = require("./src/controller/authController");

router.post('/register', auth.register);
router.post("/auth",auth.login);

router.get("/jogar/:partida/:player/:jogada",tictactoe.jogar);
router.get("/convidar",tictactoe.convidar);



module.exports = router;