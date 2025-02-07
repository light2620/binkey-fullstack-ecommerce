import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import { verifyOtpApi } from "../api/user.api"

export default function VerifyOtp(){
  
    const [otp , setOtp] = useState(["","","","","",""])
    const [email,setEmail] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); 
    const inputRef = useRef([]);

    useEffect(()=>{
        if(!location?.state?.email){
            toast.error("redirection to forget password page")
            navigate("/forgot-password")
        } else{
            setEmail(location.state.email);
        }
    },[location])
   
    function handleChange(e,index){
        const value = e.target.value
        let newData = [...otp];
        newData[index] = value
        setOtp(newData);
        if(value && index <5) inputRef.current[index+1]?.focus()
    }

    function handleKeyDown(e, index) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1]?.focus(); // Move focus to previous input ✅
        }
    }
    
    const validValue = otp .every(el => el)

    async function submitOtp(email,otp){
        if(!email){
            toast.error("Email is missing");
            return
        }
         const data = {email, otp:otp.join("")}
         console.log(data)
          try{
              const response = await verifyOtpApi(data)
              if(response.data.error){
                toast.error(response.data.message);
              }
              if(response.data.success){
                toast.success(response.data.message)
                navigate("/reset-password",{
                    state : {
                           email
                    }
                });

              }
          }catch(err){
            if(err || err.response.data){
               toast.error(err.response.data.message)  
            }
          }
    }
    return <>
        <div className = "w-[500px]  p-4 shadow-md rounded-md flex flex-col m-auto mt-2">
            <div className="font-semibold text-lg mb-3">
                <p>Enter OTP</p>
            </div>
                <div className = "flex flex-col gap-3 ">
                    <label htmlFor="otp">Enter Your OTP: </label>
                    <div className ="flex items-center gap-3 ">
                    {otp.map((item,index)=>{
                        return (
                            <input
                            maxLength={1}
                            key= {index}
                            ref={(el) => (inputRef.current[index] = el)}
                            onChange={(e) => handleChange(e,index)}
                            onKeyDown={((e)=>{handleKeyDown(e,index)})}
                            value = {otp[index]}
                            className="border w-12 h-12 p-2 outline-none focus:border-[#ffbb00] focus:border-2 bg-gray-200 rounded flex item-center justify-center text-center" 
                            type="text" 
                            />
                        )
                    })}
                    </div>
                </div>

               
                    <button  disabled = {!validValue}className = {`${validValue ? "bg-green-800 hover:bg-green-900" : " bg-gray-500" } text-white py-2 rounded font-semibold my-3 tracking-wide`}
                    onClick={()=> submitOtp(email,otp)}
                    >
                        Verify OTP
                    </button>
           
            
        </div>
    </>
}