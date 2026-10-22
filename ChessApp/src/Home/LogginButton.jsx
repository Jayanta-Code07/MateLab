

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../HomeStyle/LogginButton.css"
import LogginForm from "./LogginForm";
import { useState } from "react";

export default function LogginButton(){
    const [logginFormOpen, setLogginFormOpen]=useState(false);
    const handleLogInButton=()=>{
        setLogginFormOpen(true);
    }
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            padding: "5px"
        }} >
            <Button variant="contained" className="loggin-btn" onClick={handleLogInButton} >Log In</Button>
            <LogginForm logginFormOpen={logginFormOpen} setLogginFormOpen={setLogginFormOpen} />
        </Box>
    )
}