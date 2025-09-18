import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();
const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())      //For MiddleWare (res, req, next)
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

const port = process.env.PORT;
app.listen(port, () => {
    connectDb()
    console.log(`Server is running on ${port}`)
});