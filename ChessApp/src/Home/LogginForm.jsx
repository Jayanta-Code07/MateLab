


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
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function LogginForm({ logginFormOpen, setLogginFormOpen }) {
    const navigate=useNavigate();
    const { setIsAuthenticated }=useAuth();

    const BrandContent =
    {
        icon: BrandIcon,
        Name: "MateLab",
    }

    let [showPassword, setShowPassword] = useState(false);
    let [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
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

    const handlePasswordChange=(event)=>{
        setUserDetails({
            ...userDetails,
            [event.target.name]:event.target.value
        })
    }


    const handleSubmitSignUpForm=async(event)=>{
        event.preventDefault();
        setLogginFormOpen(false);

        const response= await fetch("http://localhost:8080/signup/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(userDetails)
        })

        const result= await response.json();
        if(response.ok){
            toast.success(result.message);
            setUserDetails({
                username:"",
                password: "",
            })
            setIsAuthenticated(true);
        }else{
            toast.error(result.message)
        }
        navigate("/");
    }

    return (
        <Dialog open={logginFormOpen} onClose={()=>setLogginFormOpen(false)} >
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
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }} >
                <Button variant="contained" color="success" type="submit" onClick={handleSubmitSignUpForm} >Log In</Button>
            </DialogActions>
            <DialogContentText sx={{ textAlign: "center", mb: "30px" }} className="signup-form-text" >Don't have an account? <a>Sign Up</a></DialogContentText>
        </Dialog>
    )
}