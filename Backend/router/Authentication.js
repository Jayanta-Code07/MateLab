

import express from "express";
const router = express.Router();
import crypto from "node:crypto";
import Redis from "ioredis";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/user.js"

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const isStrongPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  return passwordRegex.test(password);
};

const OTPKEY = (email) => `OTP-${email}`;
const userKey = (email) => `user-${email}`;


router.post("/sendemail", async (req, res) => {
  let { username, email, password, confirmPassword } = req.body;
  if (password != confirmPassword)
    return res.status(400).json({
      success: false,
      message: "Your Password is not same as you confirmed",
    })
  if (!isStrongPassword(password)) {
    return res.status(400).json({
      success: false,
      message: "Try with a strong password"
    })
  }

  if (typeof username != "string" || typeof email != "string") return res.status(400).json({
    success: false,
    message: "Sorry! You are not allowed..."
  })

  const otp = crypto.randomInt(100000, 1000000).toString();

  const Key = OTPKEY(email);

  const password_hashed = await bcrypt.hash(password, 12);

  const user = {
    username,
    email,
    password_hashed
  }

  await redis.set(Key, otp, 'EX', 130);
  await redis.set(userKey(email), JSON.stringify(user), 'EX', 130);

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jayantadebnath9883296136@gmail.com",
      pass: "edie oaoe xkfv fgbk",
    }
  })

  const result = await transport.sendMail({
    from: "jayantadebnath9883296136@gmail.com",
    to: email,
    subject: "MateLab Email Verification",
    text: `Your MateLab verification OTP is ${otp} . It will expire within 2 minutes. `
  })

  res.status(201).json({
    success: true,
    message: "Successfully Send Your Verification Email",
  })
})

router.post("/verifyotp", async (req, res, next) => {
  let { email, otp } = req.body;
  const saveOtp = await redis.get(OTPKEY(email));
  if (!saveOtp) return res.status(400).json({
    success: false,
    message: "Otp Expired or Not Found"
  })
  if (saveOtp != otp) return res.status(400).json({
    success: false,
    message: "Oops! Wrong Otp."
  })
  const savedUser = await redis.get(userKey(email));
  if (!savedUser) {
    return res.status(400).json({
      success: false,
      message: "Sign-up data expired or not exists"
    })
  }
  await redis.del(OTPKEY(email), userKey(email));

  const user = JSON.parse(savedUser);

  const new_user = await User.insert(user.username, user.email, user.password_hashed);

  await new Promise((resolve, reject) => {
    req.logIn(new_user, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    })
  })
  return res.status(201).json({
    success: true,
    message: "Congratulations! Your account created..."
  })
})


router.post("/cancel", async (req, res) => {
  let { email } = req.body;
  await redis.del(OTPKEY(email), userKey(email));
  return res.status(200).json({
    success: true,
    message: "Your Verification Canceled."
  })
})

router.post("/resendotp", async (req, res) => {
  let { email } = req.body;
  const saveOtp = await redis.get(OTPKEY(email));
  console.log(saveOtp);
  if (saveOtp) return res.status(400).json({
    success: false,
    message: "You Requesting too Frequently"
  })
  const otp = crypto.randomInt(100000, 1000000).toString();
  await redis.set(OTPKEY(email), otp, 'EX', 130);

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jayantadebnath9883296136@gmail.com",
      pass: "edie oaoe xkfv fgbk",
    }
  })

  const result = await transport.sendMail({
    from: "jayantadebnath9883296136@gmail.com",
    to: email,
    subject: "MateLab Email Verification",
    text: `Your MateLab verification OTP is ${otp} . It will expire within 2 minutes. `
  })

  return res.status(200).json({
    success: true,
    message: "Your New Otp has been sent"
  })
})


router.get("/user-auth", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      user: null,
      message: "your are not authenticated..."
    })
  }
  return res.status(200).json({
    success: true,
    user: {
      user_id: req.user.user_id,
      username: req.user.username,
      email: req.user.email
    },
    isAuthenticated: req.isAuthenticated(),
    message: `WelCome! Wish to be a insane player ${req.user.username}`
  })
})

router.post("/login",async(req,res)=>{
  let { username, password }=req.body;
  const user=await User.findByUsername(username);
  if(!user)return res.status(404).json({
    success: false,
    message: "Sorry, Username is not Found..."
  })
  const isValid=await bcrypt.compare(password,user.password);
  if(!isValid)return res.status(401).json({
        success: false,
        message: "Wrong password...",
      });
  await new Promise((resolve,reject)=>{
    req.logIn(user,(err)=>{
      if(err)return reject(err);
      resolve();
    })
  })
  return res.status(200).json({
    success: true,
    message: `Welcome Back ${req.user.username}`
  })
})

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.clearCookie("connect.sid");

            return res.status(200).json({
                success: true,
                message: "Logged out successfully"
            });
        });
    });
});

export default router;