import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'                                //Use to connect Backend and Frontend
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();
const app = express();

app.use(cors({                                         //Use to explain 'backend accept frontend content(or user input) from which URL'...
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())      //For MiddleWare (res, req, next)
app.use(cookieParser())      //hELPS TO TRANSFER THE TOKEN TO CHROME COOKIE easily
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

const port = process.env.PORT;
app.listen(port, () => {
    connectDb()
    console.log(`Server is running on ${port}`)
});