import UserModel from "../Model/user.model.js";
import bcryptjs from "bcryptjs"
import { sendEmail } from "../config/sendEmail.js";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { generateOtp } from "../utils/generateOtp.js";
import { otpForgetTemplate } from "../utils/otpEmailTemplate.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";
import nodemailer from "nodemailer"
async function  registerUserController(request,response) {
     
    try{
      const {name,email,password,confirmPassword}  = request.body;
      if(!name || !email || !password){
        return response.status(400).json({
            message : "provide email, name, password",
            error : true,
            success : false
        })
      }
      if(password !== confirmPassword) {
        return response.json({
            message : "Password  did not matched",
            error : true,
            success :false
        })
      }
      const user = await UserModel.findOne({email});
      if(user){
          return response.json({
              message : "Already register email",
              error : true,
              success : false
          })
      }

      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password,salt);
      const userDetails = {
        name,
        email,
        password : hashPassword
      }

      const newUser = new UserModel(userDetails);
      const save = await newUser.save();
      
      const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`
      const tranporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      })
      const mailOption = {
        from : "shivamnegi896@gmail.com",
        to : email,
        subject : "Your email verification link",
        text : `Link : ${verifyEmailUrl}`
      }
      try{

        let sendMail = await tranporter.sendMail(mailOption);
        console.log("Mail sent: ", sendMail.response);
          
      }catch(err){
        console.log(err)
        return response.json({
            message  : err.message || err
        })
      }

      return response.json({
        message :` Registration Success, Verification Link Sent to email ${email}`,
        error : false,
        success : true,
        data : save
    })

    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }


}


async function verifyEmailController(request,response){
    try{
       const {code} = request.body;
       const user = await UserModel.findById(code);
       if(!user){
        return response.status(400).json({
            message : "Invalid code",
            error : true,
            success : false
        })
       }
       const updateUser = await UserModel.findByIdAndUpdate({_id : code},{
        verify_email : true
       })

       return response.json({
        message : "Verify email done",
        success : true,
        error : false
    })
    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success: true
        })
    }
    

}


async function loginController(request,response){
      try{
          const {email , password } = request.body;
          if(!email || !password){ 
            return response.status(400).json({
                message : "Please provide email or password",
                error : true,
                success : false
            })
          }
          const user = await UserModel.findOne({email})
          if(!user){
            return response.status(400).json({
                message : "No user find with this email",
                error : true,
                success : false
            })
          }
          if(user.status !== "Active"){
            return response.status(400).json({
                message : "Contact to Admin",
                error : true,
                success : false
            })
        }

        const verifyPassword = await bcryptjs.compare(password,user.password);
        if(!verifyPassword){
            return response.status(400).json({
                message : "Incorrect Password",
                error : true,
                success: false
            })
        }
      
        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

 
         const cookiesOption  = {
            httpOnly : true,
            secure : false,
            sameSite: "strict",
            secure :process.env.NODE_ENV !== "development"
            
         }
         response.cookie("accessToken",accessToken,cookiesOption);
         response.cookie("refreshToken",refreshToken,cookiesOption);

         return response.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accessToken,
               refreshToken
            }
        })
        
        }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success : false ,
            
        })
      }
}

async function logoutController(request,response){
    try{
        const {userId } = request.body
        const cookiesOption = {
            httpOnly : true,
            secure : false,
            sameSite : "None"
        }
        response.clearCookie("accessToken",cookiesOption);
        response.clearCookie("refreshToken",cookiesOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{
            refresh_token : ""
        })

        return response.json({
            message : "Logout successfully",
            error : false,
            success : true
        })

    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


async function forgotPasswordController(request,response){
    try{
        const {email} = request.body
        if(!email){
            return response.status(400).json({
                message : "please provide the email"
            })
        }

        const user = await UserModel.findOne({email})
        
        if(!user){
            return response.status(400).json({
                message : "Email is not valid",
                error : true,
                success : false
            })
        }
        const otp = generateOtp();
        const expiryTime = new Date(Date.now() + 60 * 60 * 1000);
        const updateUser = await  UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expiryTime).toISOString()
        })
        const otpHtml = otpForgetTemplate(user.name,otp)
        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : process.env.EMAIL,
                pass : process.env.EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from : "shivamnegi896@gmail.com",
            to : email,
            subject : "Forgot password OTP",
            text : `Your Otp is ${otp}`,
            html : otpHtml
        }
        try{ 
            const sendmail = await transporter.sendMail(mailOptions)
            console.log("Email sent: " + sendmail.response);

        }catch(err){
            return response.json({
                message : "otp sent failed, retry",
                error  : false,
                success : true
             })
        }
         return response.json({
            message : "otp sent to your mail",
            error  : false,
            success : true
         })


    }catch(err){
        return response.status(500).json({
            message : err.message || message,
            error : true,
            success : false
        })
    }
}

async function verifyForgotPasswordOtpController(request,response){
    try{
         const  { otp, email } = request.body;
         if(!otp){
            return response.status(400).send({
                message : "please provide otp"
            })
         }
         
         const user = await UserModel.findOne({email});
         if(!user){
            return response.status(400).json({
                message : "no user found",
                error : true,
                success : false,
            })
         }
         
         const currentDate = new Date()
         const expiryTime = new Date(user.forgot_password_expiry);
         console.log(currentDate);
         console.log(expiryTime);
         if(currentDate > expiryTime){
            return response.status(400).json({
                message : "OTP Expired",
                error : true,
                success :false
           })
         }
         if(otp != user.forgot_password_otp){
            return response.status(400).json({
                message : "incorrect otp",
                error : true,
                success : false,
            })
         }
         return response.json({
            message : "otp verify successfully",
            error : false,
            success : true
         })


    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success : false

        })
    }
}


async function resetPasswordController(request,response){
    try{
        const {email , password, confirmPassword} = request.body;
        if(!email || !password || !confirmPassword){
            return response.status(400).json({
                message :  "please fill all the fields",
                error : true,
                success : false,
            })
        } 

       const user = await UserModel.findOne({email});
        if(!user){
           return response.status(400).json({
               message : "no user found",
               error : true,
               success : false,
           })
        }
        if(password != confirmPassword){
            return response.statue(400).json({
                message : "password not matched",
                error : true,
                success  : false
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword  = await bcryptjs.hash(password,salt);
        const updateUserPassword = await UserModel.updateOne({email},{
            password : hashPassword
        })

        return response.json({
            message: "password updated successfully",
            error : false,
            success : true
        })
    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
    
}

async function refreshToken(request,response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return response.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generateAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accessToken',newAccessToken,cookiesOption)

        return response.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

async function getUserDetailController(request,response){
    try{
        const userId = request.userId
        if(!userId){
            return response.json({
                message: "no user id found"
            })
        }

        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
            message : 'user details',
            data : user,
            error : false,
            success : true
        })
    }catch(err){
        return response.json({
            message : "something went wrong",
            error: true,
            success : false
        })
    }
}

async function uploadAvatarController(request,response){
    try {
        const userId = request.userId // auth middlware
        const image = request.file  // multer middlewar
        console.log(image);

        const upload = await uploadImageClodinary(image)
        console.log(upload)
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return response.json({
            message : "upload profile",
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


async function updateUserDetailsController(request,response){
     
       try{
        const userId = request.userId;

        const {name,email,mobile} = request.body
        if(!userId){
            return response.json({
                message : "no id provided"
            })
        }
        if(!name || !email ){
            return response.json({
                message : "name and email can not be blank",
                success  : false,
                error : true
            })
        }

        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            name,email,mobile
        })

        return response.json({
            message : "update done",
            success : true,
            error : false
        })
        
       }catch(err){
        return response.json({
            message : err.message || err,
            error : true,
            success : false
        })
       }

}
export {updateUserDetailsController,uploadAvatarController,registerUserController,verifyEmailController,loginController,logoutController,forgotPasswordController,verifyForgotPasswordOtpController,resetPasswordController,refreshToken,getUserDetailController}