

import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";
import { spawn } from "child_process";
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


io.on("connection", (socket) => {
  console.log("user Connected", socket.id);
  socket.on("attacks", ({ color, square, piece, currBoard }) => {

    // console.log("sending " + color + " " + square + " " + piece);

    const engine = spawn("../ChessEngine/chess_engine.exe");

    let output = "";
    let errOutput="";

    engine.stdout.on("data", (data) => {
      output += data.toString();
    })

    engine.stderr.on("data", (data)=>{
      errOutput+=data.toString();
    })


    engine.on("close", (code,signal) => {

      console.log("engine exit code: ",code);
      console.log("engine signal: ", signal);
      console.log("engine error: ",errOutput);

      const trimmedOutput = output.trim();

      const attacks = trimmedOutput
        ? trimmedOutput.split(/\s+/)
        : [];

      console.log(attacks);

      socket.emit("attacks", { source: square, attacks });

    })

    const input = {
      side: color,
      square: square,
      piece: piece,
      currBoard: currBoard
    }


    engine.stdin.write(JSON.stringify(input) + "\n");
    engine.stdin.end();
  })

  socket.on("checkMate",({ side, currBoard })=>{
    const engine=spawn("../ChessEngine/checkMate.exe");

    let output="";
    let errOutput="";

    engine.stdout.on("data",(data)=>{
      output+=data.toString();
    })
    
    engine.stderr.on("data",(data)=>{
      errOutput+=data.toString();
    })

    
    engine.on("close",(code, signal)=>{
      console.log("checkMate error: ",errOutput);
  
      const trimmedOutput=output.trim();
  
      const message=trimmedOutput? trimmedOutput.split(/\s+/) : [];
  
      console.log(message);
  
      socket.emit("checkMate", {msg: message});
  
    })
  
    const input={
      side: side,
      currBoard: currBoard
    }
  
    engine.stdin.write(JSON.stringify(input)+"\n");
    engine.stdin.end();
  })

  socket.on("move-validation", ({ piece, side, source, dest, currBoard })=>{

    console.log("Move validation of "+piece+" "+side+" "+source+" "+dest+" "+currBoard);

    const engine=spawn("../ChessEngine/validation.exe");

    let output = "";
    let errOutput="";

    engine.stdout.on("data", (data) => {
      output += data.toString();
    })

    engine.stderr.on("data", (data)=>{
      errOutput+=data.toString();
    })


    engine.on("close", (code,signal) => {

      console.log("engine exit code: ",code);
      console.log("engine signal: ", signal);
      console.log("engine error: ",errOutput);

      const trimmedOutput = output.trim();

      const isValid = trimmedOutput
        ? trimmedOutput.split(/\s+/)
        : [];

      console.log("valied ",isValid);

      socket.emit("validation", { isValid: isValid });

    })

    const input={
      piece: piece,
      side: side,
      source: source,
      dest: dest,
      currBoard: currBoard
    }
  
    engine.stdin.write(JSON.stringify(input)+"\n");
    engine.stdin.end();

  })


})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})