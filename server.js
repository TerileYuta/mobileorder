const http = require('http')
const fs = require('fs')
const WebSocketServer = require('websocket').server
const mysql = require('mysql')

//Port number
const PORT = 3000

//mysql
const sqlConnection = mysql.createConnection({
    host: "localhost",
    user: "school",
    password: "JXrU!@GKv/OPnAMv",
    database: "school" 
})

sqlConnection.connect((err) => {
    if(err) {
        console.log(`Mysql connection error: ${err.stack}`);
        return
    }

    console.log("Mysql connection success")
})

const server = http.createServer();

server.listen(PORT, () => {
    console.log(`${new Date()} サーバー起動`)
})


const WsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
})

const originIsAllowed = (origin) => {
    return true
}

WsServer.on('request', (request) => {
    if (!originIsAllowed(request.origin)) {
      request.reject()
      console.log(`${new Date()} ${request.origin} からのアクセスが拒否されました`)
    }
  
    const connection = request.accept('ishiyama', request.origin)
    console.log(`${new Date()} 接続が許可されました`)

    connection.on("message", message => {
        var message = message.utf8Data  

        var receiveMessage = JSON.parse(message)

        var receiveKey = receiveMessage.key;
        var receiveData = receiveMessage.data

        switch(receiveKey){
            case "order":
                var menu = JSON.stringify({"popcorn": receiveData.popcorn, "potato": receiveData.potato, "waffle": receiveData.waffle, "ice": receiveData.ice, "fanta": receiveData.fanta})
                
                var q = "INSERT INTO trading (id, class, grade, number, transaction, amount) VALUES(?,?,?,?,?,?)"

                sqlConnection.query(q, [receiveData.reservationNo, receiveData.grade, receiveData.class, receiveData.studentNo, menu, receiveData.amount], (err, result, fields) => {
                    if (err) throw err;
                    console.log(result)
                });


                break;

            case "getTrading":
                var q = "SELECT * FROM trading"

                sqlConnection.query(q, (err, result, fields) => {
                    if (err) throw err;
                    connection.send(JSON.stringify(result));
                });


                break;
          
        }
    })
  
    connection.on('close', (reasonCode, description) => {
      console.log(`${new Date()} ${connection.remoteAddress} が切断されました`)
    })
  })
  
