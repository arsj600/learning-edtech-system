import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
dotenv.config();
    import authRouter from "./routes/authRoute.js";
import cors from "cors"
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";

const port =process.env.PORT || 4000;
const app =express();

connectDb();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/course",courseRouter)


app.listen(port,()=>{
    console.log("Server Started")
})