const express = require("express");
const route = require("./router");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://semana:semana@tictactoe-u2vv6.mongodb.net/test?retryWrites=true&w=majority",{
   useNewUrlParser:true
});


const app = express();

app.use(route);

app.listen(3000,() =>{
   console.log("opa funcionando");
});