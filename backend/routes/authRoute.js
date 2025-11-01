import express from "express"
import { googleSignup, login, logOut, resetPassword, sendOtp, signUp, verifyOtp } from "../controller/authController.js";

const authRouter =express.Router();

authRouter.post("/signup",signUp)

authRouter.post("/login",login)
authRouter.get("/logout",logOut)
authRouter.post("/sendopt",sendOtp)
authRouter.post("/verifyopt",verifyOtp)
authRouter.post("/resetpassword",resetPassword)
authRouter.post("googlesignup",googleSignup)

export default authRouter