import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function EmailVerify(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    console.log(searchParams)
  const code = searchParams.get('code');

    useEffect(()=> {
        if(!code) navigate("/dashboard")
        if(code){
            toast.success("Verification Success")
            navigate("/")
        }
    })
    return <>
   
    </>
}