

import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";
import { chessMoveHandler } from "./socket/chessMoveHandler.js";
import cors from "cors";


const app = express()
const server = createServer(app);
const port = 8080

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})


app.use(cors());
app.use(express.json());


chessMoveHandler(io);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})