
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import BrandName from "../BrandName/BrandName.jsx";
import BrandIcon from "../assets/HomeAssets/knightBrandIcon.svg"
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import "../ChessBoardStyle/Navbar.css"

export default function Navbar(){

    const BrandContent = [
        {
            icon: BrandIcon,
            Name: "MateLab",
        }
    ]

    return (
        <AppBar position="static" className="animate__animated animate__fadeInDown" >
                <Toolbar>
                    <List>
                        {BrandContent.map((content, index) => (
                            <BrandName key={index} content={content} />
                        ))}
                    </List>

                    <Button startIcon={<SportsEsportsIcon />} sx={{
                        mt: "5px",
                    }} >Play</Button>

                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            m: "20px 10px 15px 10px",
                            borderColor: "white"
                        }}
                    />

                    <Button startIcon={<PeopleAltIcon />} sx={{
                        mt: "5px",
                    }} >1+</Button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                    <SettingsIcon sx={{ cursor: "pointer", mr: "20px", height: "22px", width: "22px" }} />
                    <Button startIcon={<LogoutIcon/>} sx={{ backgroundColor: "#EF4444" }} >Leave</Button>

                </Toolbar>
            </AppBar>
    );
}