

import Box from "@mui/material/Box";

import wK from "../assets/pieces/wK.svg";
import wQ from "../assets/pieces/wQ.svg";
import wR from "../assets/pieces/wR.svg";
import wB from "../assets/pieces/wB.svg";
import wN from "../assets/pieces/wN.svg";
import wP from "../assets/pieces/wP.svg";

import bK from "../assets/pieces/bK.svg";
import bQ from "../assets/pieces/bQ.svg";
import bR from "../assets/pieces/bR.svg";
import bB from "../assets/pieces/bB.svg";
import bN from "../assets/pieces/bN.svg";
import bP from "../assets/pieces/bP.svg";

import "../ChessBoardStyle/BoardPage.css"
import { useEffect } from "react";
import { useState } from "react";

export default function BoardPage({ AppInfo }) {

    let [sourcePos, setSourcePos] = useState([]);
    let [destPos, setDestPos] = useState([]);
    let [initialBoard, setInitialBoard]=useState([
        [bR, bN, bB, bQ, bK, bB, bN, bR],
        [bP, bP, bP, bP, bP, bP, bP, bP],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [wP, wP, wP, wP, wP, wP, wP, wP],
        [wR, wN, wB, wQ, wK, wB, wN, wR]
    ]);
    let [initialBoardStr, setInitialBoardStr]=useState([
        ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
        ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
        ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
    ]);
    let [turn, setTurn]=useState("white");


    const board = [];

    const file = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const rank = ["8", "7", "6", "5", "4", "3", "2", "1"];

    const handleClick = (row, col) => {

        const square = file[col] + rank[row];

        const isAttack =
                destPos.some(
                    ([r, c]) => r === row && c === col
                );

        if(isAttack  && (!(turn==="white" && initialBoardStr[row][col][0]==="w") && !(turn==="black" && initialBoardStr[row][col][0]==="b"))){
            if(!AppInfo.socket.current)return;

            AppInfo.socket.current.emit("move-validation", ({ piece: initialBoardStr[sourcePos[0]][sourcePos[1]][1], side: initialBoardStr[sourcePos[0]][sourcePos[1]][0], source: `${file[sourcePos[1]]}${rank[sourcePos[0]]}`, dest: square, currBoard: initialBoardStr  }))

            setInitialBoard(prevBoard=>{
                let newBoard=prevBoard.map((row)=>[...row]);

                newBoard[row][col]=newBoard[sourcePos[0]][sourcePos[1]];
                newBoard[sourcePos[0]][sourcePos[1]]=null;
                return newBoard;
            })

            setInitialBoardStr(prevBoard=>{
                let newBoard=prevBoard.map((row)=>[...row]);

                newBoard[row][col]=newBoard[sourcePos[0]][sourcePos[1]];
                newBoard[sourcePos[0]][sourcePos[1]]="";
                return newBoard;
            })

            if(turn==="white")setTurn("black");
            else setTurn("white");

            setSourcePos([]);
            setDestPos([]);
            return;

        }

        if(turn==="white" && initialBoardStr[row][col][0]==="b")return;
        if(turn==="black" && initialBoardStr[row][col][0]==="w")return;

        if(initialBoardStr[row][col]==="")return;


        if (initialBoardStr[row][col] === "wP") {
            AppInfo.socket.current.emit("attacks", ({ color: "white", square: square, piece: "P", currBoard: initialBoardStr }))
        }
        if (initialBoardStr[row][col] === "bP") {
            AppInfo.socket.current.emit("attacks", ({ color: "black", square: square, piece: "P", currBoard: initialBoardStr }))
        }
        if(initialBoardStr[row][col][1]==="N"){
            AppInfo.socket.current.emit("attacks", ({ color: initialBoardStr[row][col][0]==="w" ? "white" : "black", square: square, piece: "N", currBoard: initialBoardStr }));
        }
        if(initialBoardStr[row][col][1]==="K"){
            AppInfo.socket.current.emit("attacks", ({ color: initialBoardStr[row][col][0]==="w" ? "white" : "black", square: square, piece: "K", currBoard: initialBoardStr }));
        }
        if(initialBoardStr[row][col][1]==="B"){
            AppInfo.socket.current.emit("attacks", ({ color: initialBoardStr[row][col][0]==="w" ? "white" : "black", square: square, piece: "B", currBoard: initialBoardStr }));
        }
        if(initialBoardStr[row][col][1]==="R"){
            AppInfo.socket.current.emit("attacks", ({ color: initialBoardStr[row][col][0]==="w" ? "white" : "black", square: square, piece: "R", currBoard: initialBoardStr }));
        }
        if(initialBoardStr[row][col][1]==="Q"){
            AppInfo.socket.current.emit("attacks", ({ color: initialBoardStr[row][col][0]==="w" ? "white" : "black", square: square, piece: "Q", currBoard: initialBoardStr }));
        }

        

    }

    function calPos(str) {
        let i;
        for (i = 0; i < 8; i++) {
            if (file[i] === str[0]) break;
        }
        let j;
        for (j = 0; j < 8; j++) {
            if (rank[j] === str[1]) break;
        }
        return [j, i];
    }

    useEffect(() => {
        if (AppInfo.attackDetails == null) return;

        // console.log("ATTACK DETAILS:", AppInfo.attackDetails);

        let { source, attacks } = AppInfo.attackDetails;

        setSourcePos(calPos(source));
        setDestPos(attacks.map((attack) => calPos(attack)))

    }, [AppInfo.attackDetails])

    useEffect(()=>{
        if(!AppInfo.socket.current)return;
        AppInfo.socket.current?.emit("checkMate",{ side: turn, currBoard: initialBoardStr });
    },[turn]);

    useEffect(()=>{
        console.log(AppInfo.mate);
    },[AppInfo.mate])

    useEffect(()=>{
        let cond=AppInfo.moveValidate;
        console.log(cond);
        if(cond.length && cond[0]=='false'){
            console.log("wrong move");
        }
    },[AppInfo.moveValidate])

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            let isLight = (row + col) % 2 === 0;
            const isSource = (sourcePos[0] === row && sourcePos[1] === col);

            const isAttack =
                destPos.some(
                    ([r, c]) => r === row && c === col
                );
            const piece = initialBoard[row][col];

            board.push(
                <Box
                    key={`${row}-${col}`}
                    className={`
                        square
                        ${isLight ? "Light" : "Dark"}
                        ${isSource ? "source-highlight" : ""}
                        ${isAttack ? "attack-highlight" : ""}
                    `}
                    onClick={() => handleClick(row, col)}
                >
                    {
                        piece &&
                        <img
                            src={piece}
                            alt="Chess Piece"
                            className={`${turn[0]===initialBoardStr[row][col][0] ?"chess-piece" : "chess-piece-deactivate"}`}
                        />
                    }
                </Box>
            )
        }
    }

    return (
        <Box className="Board-body" >
            {board}
        </Box>
    )
}