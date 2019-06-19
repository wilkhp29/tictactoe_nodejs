const Partida = require("../model/partida");

module.exports = {
    async convidar(req,res){
    const partida = await Partida.create({
        finsh:false,
        winner:"",
        board:["","","","","","","","",""],
        turnIndex:0,
        p1:"william",
        p2:"renner",
        sequenceWinner:[]
        });
        
        res.json(partida);
    },
    async jogar(req,res) {
        const partidaId = req.params.partida;
        const player = req.params.player;
        const jogada =  req.params.jogada;
        const partida = await Partida.findById(partidaId);
        
        const winning_sequences = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];


        if(partida.finsh) res.send("fim de partida");
        if(partida.board[jogada] === ""){
            if(player === partida.p1){
                if(partida.turnIndex === 0){
                    partida.board.set(jogada,"O");
                    for(i in winning_sequences){
                        if( partida.board[winning_sequences[i][0]] == "O" &&
                            partida.board[winning_sequences[i][1]] == "O" &&
                            partida.board[winning_sequences[i][2]] == "O"){
                            partida.sequenceWinner = i;
                            partida.winner = player;
                            partida.finsh = true;
                            }
                    }
                    partida.turnIndex = (partida.turnIndex === 0 ? 1 : 0);
                } 
            }
            if(player === partida.p2){
                if(partida.turnIndex === 1){
                    partida.board.set(jogada,"X");
                    for(i in winning_sequences){
                        if( partida.board[winning_sequences[i][0]] == "X" &&
                            partida.board[winning_sequences[i][1]] == "X" &&
                            partida.board[winning_sequences[i][2]] == "X"){
                               partida.sequenceWinner = i ;
                               partida.winner = player;
                               partida.finsh = true;
                            }
                    }
                    partida.turnIndex = (partida.turnIndex === 0 ? 1 : 0);
                }
            }
        
           
            partida.save();
        }


       
      
          


       

       

        res.send(partida);
    },
}