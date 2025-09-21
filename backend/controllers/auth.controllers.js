import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
    try {
        const {fullName, email, password, mobile, role} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User Already Exist"});
        }

        if(password.length < 6){
            return res.status(400).json({ message: "Password must be > 6"});
        }

        if(mobile.length < 10){
            return res.status(400).json({ message: "Wrong Mobile Number"});
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            fullName, 
            email,
            role,
            mobile,
            password: hashedPassword
        })

        const token = genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "lax",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(201).json(user);

    } catch (error) {
        console.error("Signup Error:", error);  // 👈 backend console me dikhega
    return res.status(500).json({ message: "Sign Up error", error: error.message });
    }
}

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User doesn't Exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message:"Incorrect Password" })
        }

        const token = genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "lax",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json(`Sign In error ${error}`)
    }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json("LogOut Successfully!!!");

    } catch (error) {
        return res.status(500).json(`Sign Out error ${error}`)
    }
}




export const sendOtp = async (req, res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User does not Exist."})
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000     //Time in MiliSeconds... 5 mins
        user.isOtpVerified = false
        await user.save()
        await sendOtpMail(email, otp)
        return res.status(200).json({message: "OTP sent Successfully"})

     } catch (error) {
        return res.status(400).json(`Send otp error ${error}`)
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const {email, otp} = req.body
        const user  = await User.findOne({email})
        if(!user || user.resetOtp!=otp || user.otpExpires < Date.now()){
            return res.status(400).json({ message:"Invalid/Expired OTP"})
        }
        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({ message: " OTP Verified Successfully "})
    } catch (error) {
        return res.status(500).json(`Verify OTP Error ${error}`)
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {email, newPassword} = req.body
        const user  = await User.findOne({email})
        if(!user || !user.isOtpVerified){
            return res.status(400).json({ message:"OTP verification required."})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()
        return res.status(200).json({ message: "Password reset Successfully" })

    } catch (error) {
        return res.status(500).json(`reset password error ${error} `)
    }
}

export const googleAuth = async (req, res) => {
    try {
        const { fullName, email, mobile, role } = req.body
        let user = await User.findOne({email});

        if(!user){
            user = await User.create({
                fullName, email, mobile, role
            })
        }

        const token = genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "lax",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(user.wasNew ? 201 : 200).json(user);

    } catch (error) {
        return res.status(500).json(`Google Auth error ${error.message} `)
    }
}

