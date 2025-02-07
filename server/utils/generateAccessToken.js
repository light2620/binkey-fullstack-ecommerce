import dotenv from  "dotenv"
import jwt from "jsonwebtoken"
dotenv.config();
const generateAccessToken = async (userId)=>{
 
        const token = await jwt.sign({id : userId} , process.env.SECRET_KEY_ACCESS_TOKEN,{expiresIn : '5h'});
        return token;
    
}
export {generateAccessToken};