
import Box from "@mui/material/Box"
import "../HomeStyle/Footer.css"
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Fragment } from "react";


export default function Footer() {

    const Footer_List = [
        {
            Name: "Support"
        },
        {
            Name: "Chess Terms"
        },
        {
            Name: "About"
        },
        {
            Name: "Students"
        },
        {
            Name: "Jobs"
        },
        {
            Name: "Devolopers"
        },
        {
            Name: "User Agreement"
        },
        {
            Name: "Privacy Policy"
        },
        {
            Name: "Privacy Setting"
        },
        {
            Name: "Cheating & Fair Play"
        },
        {
            Name: "Partners"
        },
    ]

    const IconList = [
        {
            icon: <AppleIcon />
        },
        {
            icon: <AndroidIcon />
        },
        {
            icon: <XIcon />
        },
        {
            icon: <YouTubeIcon />
        },
        {
            icon: <FacebookIcon />
        },
        {
            icon: <InstagramIcon />
        },
        {
            icon: <GitHubIcon />
        },
    ]

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="animate__animated animate__fadeInUp" >
            <Box className="footer-box" >
                {
                    Footer_List.map((el, index) => (
                        <Fragment key={index} >
                            <button className="footer-btn" >{el.Name}</button>
                            <p style={{ color: "#d6d6d2" }} >•</p>
                        </Fragment>
                    ))

                }
                <button className="footer-btn">MateLab.com @ 2026</button>
            </Box>
            <Box className="footer-box">
                {
                    IconList.map((el, index) => (
                        <Fragment key={index}>
                            <button className="footer-btn">
                                {el.icon}
                            </button>

                            {index === 1 && (
                                <div
                                    style={{
                                        height: "30px",
                                        width: "1px",
                                        backgroundColor: "white",
                                        margin: "0 10px",
                                    }}
                                />
                            )}
                        </Fragment>
                    ))
                }
            </Box>
        </Box>
    )
}