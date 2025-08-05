import { WebSocketServer } from "ws";
import { client } from "@repo/db/client"

const server = new WebSocketServer({ port: 8081 });

server.on("connection", (socket) => {
    client.user.create({
        data: {
            username: Math.random().toString(36).substring(2, 7),
            password: Math.random().toString(36).substring(2, 7)
        }
    });

    socket.send("the message is sent to the client")
});



console.log('server started');

