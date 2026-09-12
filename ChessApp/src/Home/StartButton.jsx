
import Button from "@mui/material/Button"

export default function StartButton(){
    return (
        <Button variant="contained" className="signup-btn"  sx={{
            mt: "30px",
            width: "55%",
            // height: "2.8rem"
            fontSize: "1.2rem",
            fontFamily: "Cinzel, serif",
            fontWeight: 700,
            borderRadius: "10px"
        }} > Get Started </Button>
    )
}