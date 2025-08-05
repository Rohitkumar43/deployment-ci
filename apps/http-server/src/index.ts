import express from "express";
import { client } from "@repo/db/client";

const app = express();
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await client.user.create({
            data: {
                username,
                password
            }
        });
        console.log(user);

        res.status(201).json({
            message: "User created successfully!",
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Start the server
app.listen(3005, () => {
    console.log("Server running on port 3005");
});
