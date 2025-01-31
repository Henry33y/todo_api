import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcyrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const createJWTToken = (id) => {
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' })
}

export const registerUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email })

        if(existingUser){
            return res.status(400).json({ success: false, message: "User already exists"})
        }

        const password = await bcyrpt.hash(req.body.password, 10)
        const userData = new User({
            name: req.body.name,
            email: req.body.email,
            password: password,
        })

        const savedUser = await userData.save()

        const token = createJWTToken(savedUser._id)

        res.status(201).json({ success: true, token, data: savedUser })
    } catch (error) {
        console.log("Server Error: ", error);
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    //check if the user exists and the details are correct. If they are, then return jwt
    try{
        const { email, password } = req.body
    
        if(!email || !password){
            return res.status(400).json({ success: false, message: "Email and Password are required" })
        }

        const existingUser = await User.findOne({ email })
        if(!existingUser){
            return res.status(400).json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcyrpt.compare(password, existingUser.password)
        if(!isMatch){
            return res.status(400).json({ success: false, message: "Password is incorrect" })
        }

        const token = createJWTToken(existingUser._id)
        res.status(200).json({ success: true, token })
    }catch(error){
        return res.status(500).json({ success: false, message: error.message })
    }       
}