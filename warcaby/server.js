const PORT = 3000;
var fs = require("fs");
var qs = require("querystring")
var http = require("http");

var players = []
var currentPlayer = 0
var lastMoved
let twoPlayers = false



var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            if (req.url == "/") {

                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url === "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url.includes(".js")) {
                fs.readFile("static" + req.url, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".jpg")) {
                fs.readFile("static" + req.url, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }

            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write("<h1>404 - brak takiej strony</h1>");
                res.end();
            }
            break;
        case "POST":

            servResponse(req, res)
            break;

    }
})





server.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})


function servResponse(req, res) {

    var allData = "";

    req.on("data", function (data) {
        allData += data;
    })

    req.on("end", function (data) {
        console.log("end")
        var finish = qs.parse(allData)
        switch(finish.action){
        case "login" : 
            if (players.length < 2) {
                if (players[0] == undefined) {
                    players.push(finish.name)
                    res.end(finish.name + "&" + "white");
                }
                else {
                    if (players[0] == finish.name) {
                        res.end("0")
                    }
                    else {
                        players.push(finish.name)
                        res.end(finish.name + "&" + "black");
                        twoPlayers = true
                    }
                }
            }
            else{
                res.end("1")
            }
            break
        
       case "reset":
            players = []
            break
        

        // else if(finish.action=="sendBoard"){
        //     var sentBoard = qs.parse(allData)
        //     board = sentBoard.board
        //     currentPlayer += 1
        //     if(currentPlayer%2==0){
        //         playerColor = "white"
        //     }
        //     else{
        //         playerColor = "black"
        //     }
        // }

        // else if(finish.action=="readBoard"){
        //     if(board != undefined)
        //     {let boardToSend = board
        //     res.end(boardToSend)
        //     }

        // }
        // else if(finish.action=="checkPlayer"){
        //     res.end(playerColor)
        // }
        case "move":
            lastMoved = finish.obj
            break
        
        case "pawn":
            res.end(lastMoved)
            break
            
        case "play":
            res.end(JSON.stringify(twoPlayers))
            
        }
        
    })
}
