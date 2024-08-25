import express from 'express'
import { Server } from "socket.io"


const app = express()

const server = app.listen(3000, () => console.log(`Backend connected at port 3000!`))

const io = new Server(server, {
    cors: "*",
})

io.use((socket, next) => {
    console.log(" name: ", socket.handshake.auth.name);

    // check name
    if (!socket.handshake.auth.name) {
        return next(new Error("Name is required"))
        // console.log("Name is required")
        // return;    
    }
    socket.userName = socket.handshake.auth.name
    return next()
})

io.on("connection", (socket)=>{    

    console.log("socket id: ", socket.id); 

    socket.on("clientToServer", (message) =>{
        console.log("Message From Frontend", message);
        // socket.emit("ServerToClient", message)
        io.emit("ServerToClient", {from: socket.userName, message})
        // socket.broadcast.emit("ServerToClient", {from: socket.userName, message})
    })
})