import { Outlet } from "react-router-dom";
import DropDownMenu from "../src/components/dropdown";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Dashboard(){
  const user = useSelector((state) => state.user);
  const [isLoggedIn ,setisLoggedIn] = useState(false)

  const navigate = useNavigate()
  useEffect(()=>{
    if(!user._id){
        setisLoggedIn(true)
        
    }
  },[user])
  if(!user._id){
    return <div>
        ....log in first
    </div>
  }
    return (
        <section className="bg-white">
            <div className = "container mx-auto p-3 flex ">
                 <div className="py-4 stickey top-24 hidden lg:block ">
                    <DropDownMenu /> 
                 </div>
                 <div className="bg-white p-4  w-full">
                  <Outlet />
                 
                  </div>
            </div>
            
        </section>
    )
}