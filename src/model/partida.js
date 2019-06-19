const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PartidaSchema = new Schema({
    finsh:Boolean,
    winner:String,
    board:Array,
    turnIndex:Number,
    p1:String,
    p2:String,
    sequenceWinner:Array
},{
    timeststamp:true
});

module.exports = mongoose.model('Partida',PartidaSchema);