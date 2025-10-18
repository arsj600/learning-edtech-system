import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser } from "../controller/userController.js"
// import upload from "../middlewares/multer.js"



let userRouter = express.Router()

userRouter.get("/currentuser",isAuth,getCurrentUser)


export default userRouter