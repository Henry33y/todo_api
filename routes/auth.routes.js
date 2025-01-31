import { Router } from 'express'
import { login, registerUser } from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', login)

export default authRouter