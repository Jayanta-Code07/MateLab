

import Typography from "@mui/material/Typography";
import StartButton from "./StartButton";
import OtherButton from "./OtherButton";
import "../HomeStyle/RightHero.css"

export default function TopRightCompo({ Text, other, btnName, stIcon }) {
    return (
        <>
            <Typography className="Hero-Text-Primary" >
                {Text[0]}
            </Typography>
            <Typography className="Hero-Text-Primary" >
                {Text[1]}
            </Typography>
            <Typography className="Hero-Text-Secondary" sx={{
                mt: "10px"
            }} >
                {Text[2]}
            </Typography>
            <Typography className="Hero-Text-Secondary" >
                {Text[3]}
            </Typography>
            {
                other? <OtherButton btnName={btnName} stIcon={stIcon}  /> : <StartButton />
            }
        </>
    )
}