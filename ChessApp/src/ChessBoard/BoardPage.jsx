

import Box from "@mui/material/Box";
import Navbar from "./Navbar.jsx";
import Board from "./Board.jsx";
import Typography from "@mui/material/Typography";

import "../ChessBoardStyle/BoardPage.css";
import Divider from "@mui/material/Divider";


export default function BoardPage({ AppInfo }) {

    const Rank = [8, 7, 6, 5, 4, 3, 2, 1];
    const File = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];



    return (
        <Box className="Board-page-container" >
            <Navbar />
            <Box className="Playground-Body">
                <Box className="Player-Stats animate__animated animate__slideInLeft" >
                    <Box className="Opponent-Box">
                        <img src="https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80" alt="" className="Profile-img" />
                        <Box>
                            <Typography>You</Typography>
                            <Typography>White</Typography>
                        </Box>
                    </Box>
                    <Box className="Opponent-Capture_Box" >
                        <Box className="piece-container" >
                            <Typography>Captured Pices(White)</Typography>
                            <Box className="Cap-Pieces" >

                            </Box>
                        </Box>
                    </Box>
                    <Box className="Opponent-Box">
                        <img src="https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80" alt="" className="Profile-img" />
                        <Box>
                            <Typography>You</Typography>
                            <Typography>White</Typography>
                        </Box>
                    </Box>
                    <Box className="Opponent-Capture_Box" >
                        <Box className="piece-container" >
                            <Typography>Captured Pices(White)</Typography>
                            <Box className="Cap-Pieces" >

                            </Box>
                        </Box>
                    </Box>
                    <Box className="Curr-Play-Stats" >
                        <Box className="Curr-Play-Stats-container" >
                            <Typography>Game Info</Typography>
                            <Divider sx={{ borderColor: "#252525" }} ></Divider>
                        </Box>
                    </Box>
                </Box>
                <Box className="board-container animate__animated animate__zoomIn" >
                    <Box className="rankNum">{
                        Rank.map((el) => (
                            <Box key={el} className="rankBox">{el}</Box>
                        ))
                    }</Box>
                    <Box className="board-wrapper" >
                        <Board AppInfo={AppInfo} />
                        <Box className="filesNum" >
                            {
                                File.map((el) => (
                                    <Box key={el} className="fileBox" >{el}</Box>
                                ))
                            }
                        </Box>
                    </Box>
                </Box>
                <Box className="Game-Stats animate__animated animate__slideInRight" >
                    <Box className="analytics">

                    </Box>
                    <Box className="Move-history">

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}