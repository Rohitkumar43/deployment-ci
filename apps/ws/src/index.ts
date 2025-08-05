import { WebSocketServer } from "ws";
import { client } from "@repo/db/client"

const server = new WebSocketServer({ port: 8081 });

server.on("connection", async (socket) => {
    try {
        const newUser = await client.user.create({
            data: {
                username: Math.random().toString(36).substring(2, 7),
                password: Math.random().toString(36).substring(2, 7)
            }
        });
        
        console.log('New user created:', newUser);
        socket.send(JSON.stringify({
            message: "User created successfully",
            user: newUser
        }));
    } catch (error) {
        console.error('Error creating user:', error);
        socket.send(JSON.stringify({
            error: "Failed to create user"
        }));
    }
});



console.log('server started');

