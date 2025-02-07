import { Router } from "express";
import { getUserDetailController, forgotPasswordController, loginController, logoutController, registerUserController, resetPasswordController, verifyForgotPasswordOtpController, uploadAvatarController, updateUserDetailsController } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

 userRouter.post("/register",registerUserController)
 userRouter.post("/login",loginController);
 userRouter.post("/logout",auth,logoutController)
 userRouter.put("/forgot-password",forgotPasswordController);
 userRouter.post("/verify-otp",verifyForgotPasswordOtpController)
 userRouter.put("/reset-password",resetPasswordController);
 userRouter.get("/user",auth,getUserDetailController)
 userRouter.put("/upload-avatar",auth,upload.single('avatar'),uploadAvatarController)
 userRouter.put("/user-update",auth,updateUserDetailsController)
 export {userRouter}