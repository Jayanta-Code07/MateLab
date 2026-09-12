

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../HomeStyle/SignUpButton.css"

export default function SignUpButton(){
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            padding: "5px"
        }} >
            <Button variant="contained" className="signup-btn" >Sign Up</Button>
        </Box>
    )
}