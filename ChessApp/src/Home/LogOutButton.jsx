

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../HomeStyle/LogginButton.css"
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function LoggOutButton(){
    const { setIsAuthenticated }=useAuth();
    const handleLogOutButton=async()=>{
        const response= await fetch("http://localhost:8080/signup/logout",{
            method: "GET",
            credentials: "include"
        })
        const result= await response.json();
        toast.success(result.message);
        setIsAuthenticated(false);
    }
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            padding: "5px"
        }} >
            <Button variant="contained" className="loggin-btn" onClick={handleLogOutButton} >Log Out</Button>
        </Box>
    )
}