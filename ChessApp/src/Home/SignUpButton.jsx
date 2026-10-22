

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../HomeStyle/SignUpButton.css"
import { useEffect, useState } from "react";
import SignUpForm from "./SignUpForm";
import OTPForm from "./OTPForm"


export default function SignUpButton(){

    let [signUpFormOpen,setSignUpFormOpen]=useState(false);
    let [openOTPForm, setOpenOTPForm]=useState(false);
    let [reqEmail,setReqEmail]=useState("");

    const handleSignUpButton=()=>{
        setSignUpFormOpen(true);
    }

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            padding: "5px"
        }} >
            <Button variant="contained" className="signup-btn" onClick={handleSignUpButton} >Sign Up</Button>
            <SignUpForm signUpFromOpen={signUpFormOpen} setSignUpFormOpen={setSignUpFormOpen} setOpenOTPForm={setOpenOTPForm} setReqEmail={setReqEmail} />
            <OTPForm openOTPForm={openOTPForm} setOpenOTPForm={setOpenOTPForm} reqEmail={reqEmail} />
        </Box>
    )
}