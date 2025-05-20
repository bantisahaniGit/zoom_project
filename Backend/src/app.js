import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";
import mongoose from "mongoose";

import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8000));

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended: true}));


app.use("/api/v1/users", userRoutes);


// app.get("/home",(req,res)=>{
//     return res.json({"hello":"world"})
// })

const start = async ()=>{
    const connectiondb = await mongoose.connect("mongodb+srv://Bantisahani567:Banti12345@cluster0.se9lkxq.mongodb.net/");

    console.log(`Mongo Connected Host: ${connectiondb.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("app is linstening on the port number 8000")
    })
}

start();