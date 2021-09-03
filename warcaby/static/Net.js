class Net {
    constructor() {
        console.log("net")
        
    }
    loginClicked(name) {
        $.ajax({
            url: "/",
            data: { name: name, action: "login" },
            type: "POST",
            success: function (name) {
                if (name != 0&&name!=1) {
                    let params = name.split("&")
                    $("#logowanie").remove()
                    let status = "Witaj "+params[0]+" grasz "+params[1]
                    $("#status").append(status)
                    game.generatePawns(params[1])
                }
                else if(name==0){
                    console.log("istnieje gracz o takim nicku")
                    alert("istnieje gracz o takim nicku")
                }
                else if(name==1){
                    console.log("za duzo graczy")
                    alert("za duzo graczy")
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    reset() {
        $.ajax({
            url: "/",
            data: {action: "reset" },
            type: "POST",
            success: function (name) {

                
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    //  sendBoard(board, player) {
    //     $.ajax({
    //         url: "/",
    //         data: {board:board,action: "sendBoard" },
    //         type: "POST",
    //         success: function (name) { 
                
    //         },
    //         error: function (xhr, status, error) {
    //             console.log(xhr);
    //         },
    //     });
    // }
/*
    readBoard(){
        $.ajax({
            url: "/",
            data: {action: "readBoard" },
            type: "POST",
            success: function (boardd) {
                game.changeBoard(boardd)
                
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    } */
    // checkPlayer(){
    //     $.ajax({
    //         url: "/",
    //         data: {action: "checkPlayer" },
    //         type: "POST",
    //         success: function (player) {
    //             game.changePlayer(player)
                
    //         },
    //         error: function (xhr, status, error) {
    //             console.log(xhr);
    //         },
    //     });
    // }

    move(obj){
        $.ajax({
            url: "/",
            data: {obj:obj,action: "move" },
            type: "POST",
            success: function (obj) {

                
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    
    pawn(){
        $.ajax({
            url: "/",
            data: {action: "pawn" },
            type: "POST",
            success: function (obj) {
                game.opponentMove(obj)
                
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    play(){
        $.ajax({
            url: "/",
            data: {action: "play" },
            type: "POST",
            success: function (obj) {
                game.checkIfPlay(obj)
                
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    
}