

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../HomeStyle/LogginButton.css"

export default function LogginButton(){
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            padding: "5px"
        }} >
            <Button variant="contained" className="loggin-btn" >Log In</Button>
        </Box>
    )
}