
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import BrandIcon from "../assets/HomeAssets/knightBrandIcon.svg"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import { Box } from "@mui/material"
import "../HomeStyle/SignUpForm.css"
import { useState } from "react"
import { toast } from "react-toastify"

export default function SignUpForm({ signUpFromOpen, setSignUpFormOpen, setOpenOTPForm, setReqEmail }) {

    

    const BrandContent =
    {
        icon: BrandIcon,
        Name: "MateLab",
    }

    let [showPassword, setShowPassword] = useState(false);
    let [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleUsernameChange=(event)=>{
        setUserDetails({
            ...userDetails,
            [event.target.name]:event.target.value
        })
    }

    const handleEmailChange=(event)=>{
        setUserDetails({
            ...userDetails,
            [event.target.name]:event.target.value
        })
    }

    const handlePasswordChange=(event)=>{
        setUserDetails({
            ...userDetails,
            [event.target.name]:event.target.value
        })
    }


    const handleConfirmPasswordChange=(event)=>{
        setUserDetails({
            ...userDetails,
            [event.target.name]:event.target.value
        })
    }

    const handleSubmitSignUpForm=async(event)=>{
        event.preventDefault();
        setSignUpFormOpen(false);
        if(userDetails.password!=userDetails.confirmPassword){
            toast.error("Password Missmatch");
            return;
        }

        const response= await fetch("http://localhost:8080/signup/sendemail",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        })

        const result= await response.json();
        if(response.ok){
            toast.success(result.message);
            setOpenOTPForm(true);
            setReqEmail(userDetails.email);
            setUserDetails({
                username:"",
                email: "",
                password: "",
                confirmPassword: ""
            })
        }else{
            toast.error(result.message)
        }
    }

    return (
        <Dialog open={signUpFromOpen} onClose={()=>setSignUpFormOpen(false)} >
            <DialogTitle>
                <Box className="brand-icon-wrapper">
                    <img
                        src={BrandContent.icon}
                        alt="MateLab"
                        className="brand-icon"
                    />
                </Box>
            </DialogTitle>
            <DialogTitle sx={{ textAlign: "center" }} className="signup-form-title" >Create Your MateLab Account</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ textAlign: "center", mb: "30px" }} className="signup-form-text" >Welcome to MateLab!</DialogContentText>
                <form className="signup-form" autoComplete="off" >
                    <TextField name="email" value={userDetails.email} variant="outlined" color="secondary" label="Email" sx={{ width: "16rem" }} onChange={handleEmailChange} className="signup-input" required focused />
                    <TextField name="username" value={userDetails.username} variant="outlined" color="secondary" label="Username" sx={{ width: "16rem" }} onChange={handleUsernameChange} autoComplete="new-username" className="signup-input" required focused />
                    <FormControl sx={{ width: '16rem' }} variant="outlined" className="signup-input" >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            name="password"
                            value={userDetails.password}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={handlePasswordChange}
                            label="Password"
                        />
                    </FormControl><hr style={{ minWidth: "100%", borderColor: "#333333" }} />
                    <FormControl sx={{ width: '16rem' }} variant="outlined" className="signup-input" >
                        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            name="confirmPassword"
                            value={userDetails.confirmPassword}
                            id="confirm-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={handleConfirmPasswordChange}
                            label="Confirm Password"
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }} >
                <Button variant="contained" className="form-signup-btn" type="submit" onClick={handleSubmitSignUpForm} >Sign Up</Button>
            </DialogActions>
            <DialogContentText sx={{ textAlign: "center", mb: "30px" }} className="signup-form-text" >Already have an Account? <a>Sign In</a></DialogContentText>
        </Dialog>
    )
}