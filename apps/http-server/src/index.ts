import express from "express";
import {client} from "@repo/db/client"



const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    console.log("Hello World");
})

app.get('/signup' , async(req , res) => {
    const username = req.body.username;
    const password = req.body.password;


    const user = await client.user.create({
        data: {
            username: username,
            password: password
        }
    })
    
    res.status(201).json({
        message: "User created successfully!"
    });
})


app.listen(3005);