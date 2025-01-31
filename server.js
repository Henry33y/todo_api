import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.config.js';
import todoRouter from './routes/todo.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

dotenv.config()

app.use(express.json())

app.use('/api', todoRouter)
app.use('/api', authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    connectDB()
})