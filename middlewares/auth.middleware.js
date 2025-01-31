import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}

export const requireAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({ success: false, message: "Access Denied. Please login" })
    }
    jwt.verify(token, JWT_SECRET, (err, decodedToken)=>{
        if(err){
            return res.status(401).json({ success: false, message: "Authentication failed. Invalid or expired token" })
        }else{
            req.user = decodedToken
            next()
        }
    })
}