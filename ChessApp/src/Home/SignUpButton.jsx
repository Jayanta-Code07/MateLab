

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../HomeStyle/SignUpButton.css"
import { SignUpButton } from "@clerk/react"

export default function SignUpButtonMan(){
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            padding: "5px"
        }} >
            <SignUpButton>
            <Button variant="contained" className="signup-btn" >Sign Up</Button>
            </SignUpButton>
        </Box>
    )
}