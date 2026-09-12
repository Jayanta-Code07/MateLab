
import Button from "@mui/material/Button"

export default function OtherButton({ btnName, stIcon }) {
    return (
        <Button variant="contained" className="loggin-btn"
            startIcon={
                <img src={stIcon} />
            }
            sx={{
                mt: "30px",
                width: "55%",
                // height: "2.8rem"
                fontSize: "1.2rem",
                fontFamily: "Cinzel, serif",
                fontWeight: 700,
                background: `
            linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.18) 0%,
                rgba(255, 255, 255, 0.06) 25%,
                rgba(0, 0, 0, 0.08) 60%,
                rgba(0, 0, 0, 0.18) 100%
            )
        `,

                color: "#f1f1ed",
                borderRadius: "10px",
                boxShadow: "0 3px 8px rgba(0, 0, 0, 0.25)",

                "& .MuiButton-startIcon": {
                    marginRight: "18px",
                    marginLeft: "0px",

                    "& img": {
                        width: "28px",
                        height: "28px",
                        objectFit: "contain",
                    }
                }

            }} >{btnName}</Button>
    )
}