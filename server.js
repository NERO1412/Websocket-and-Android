//variable
const SocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req, res) => {})

//server listening
server.listen(3000, ()=> {
    console.log("Listening on port 3000 ...")
})

wsServer = new SocketServer({httpServer:server})

//store all the connection
const connections = []

//check new connection request...
wsServer.on('request', (req) => {
    const connection = req.accept()
    console.log('new connection')
    connections.push(connection) //add to connection array

    //whenever there is a new message, message event call
    connection.on('message', (mes) => {

        //send message to everyone except the sender
        connections.forEach(element => {
            if (element != connection)
                element.sendUTF(mes.utf8Data)
        })
    })

    //when the connection closed
    connection.on('close', (resCode, des) => {
        console.log('connection closed')

        //Remove 'that' connection from connection Array
        connections.splice(connections.indexOf(connection), 1)
    })
})
