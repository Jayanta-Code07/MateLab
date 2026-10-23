
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import OtpInput from "react-otp-input"
import BrandIcon from "../assets/HomeAssets/knightBrandIcon.svg"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"


export default function OTPForm({ openOTPForm, setOpenOTPForm, reqEmail }) {

    const { setIsAuthenticated }= useAuth();

    let [otp, setOtp] = useState("");

    let [timer, setTimer]=useState(120);

    useEffect(()=>{
        if(timer<=0)return;
        let time=setInterval(()=>{
            setTimer(prev=>prev-1);
        },1000)
        return ()=>clearInterval(time);
    },[timer]);

    useEffect(()=>{
        if(otp.length<6)return;
        async function otpVerification() {
            let response=await fetch("http://localhost:8080/signup/verifyotp",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body:JSON.stringify({ 
                    email: reqEmail,
                    otp: otp 
                })
            })
            let result=await response.json();
            setTimer(0);
            setOtp("");
            if(response.ok){
                toast.success(result.message);
                setOpenOTPForm(false);
                setIsAuthenticated(true);
            }else{
                toast.error(result.message);
            }
        }
        otpVerification();
    },[otp])

    const handleCancelVerification=async()=>{
        let response=await fetch("http://localhost:8080/signup/cancel",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({ 
                    email: reqEmail,
                })
            });

        let result=await response.json();
        setTimer(0);
        if(response.ok){
                toast.success(result.message);
                setOpenOTPForm(false);
            }else{
                toast.error(result.message);
            }
    }

    const handleResendOTP=async()=>{
        let response=await fetch("http://localhost:8080/signup/resendotp",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({ 
                    email: reqEmail,
                })
            });

        let result=await response.json();
        if(response.ok){
                setTimer(120);
                toast.success(result.message);
            }else{
                toast.error(result.message);
            }
    }


    const BrandContent =
    {
        icon: BrandIcon,
        Name: "MateLab",
    }

    return (
        <Dialog open={openOTPForm}>
            <DialogTitle>
                <Box className="brand-icon-wrapper">
                    <img
                        src={BrandContent.icon}
                        alt="MateLab"
                        className="brand-icon"
                    />
                </Box>
            </DialogTitle>
            <DialogTitle sx={{ textAlign: "center" }} className="signup-form-title" >MateLab OTP Verification!</DialogTitle>
            <DialogContent className="signup-form" >
                <DialogContentText sx={{ textAlign: "center" }} className="signup-form-text" >You can get your OTP from {reqEmail}</DialogContentText>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>--</span>}
                    renderInput={(props) => <input {...props} style={{
                        width: "2.5rem",
                        height: "3rem",
                        fontSize: "2rem",
                        textAlign: "center",
                        borderRadius: "10px"
                    }} className="signup-form-title" />}
                />
                <DialogContentText sx={{ textAlign: "center" }} className="signup-form-text" >{ timer>0 ? (`Your OTP is valid till ${Math.floor(timer/60)}min ${timer%60}s`): (<>Oops! Your Time is over.{" "}<a style={{ color: "#1976D2", cursor: "pointer" }} onClick={handleResendOTP} >resend?</a></>) }</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }} >
                <Button variant="contained" color="success" sx={{ color: "white", mb: "15px" }} onClick={handleCancelVerification} >Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}