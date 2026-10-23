

import { spawn } from "child_process";
import Redis from "ioredis";

// const redis= new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export function chessMoveHandler(io){
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

      if(!isValid)return;

      

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
}