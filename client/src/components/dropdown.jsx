import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { userLogoutApi } from "../api/user.api";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setLogOut } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { setCart } from "../redux/cartSlice";
import { useEffect, useState } from "react";

export default function DropDownMenu(){
    const user = useSelector((state) => state.user);
    const [isAdmin,setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    async function logoutUser (){
         try{
             const response = await userLogoutApi()
             if(response.data.error){
                toast.error(response.data.message)
             }
             if(response.data.success){
                toast.success(response.data.message)
                localStorage.clear();
                dispatch(setLogOut());
                dispatch(setCart([]))
                navigate("/")
             }
         }catch(err){
          console.log(err);            
         }
    }
    useEffect(()=>{
        if(user.role === 'ADMIN'){
            setIsAdmin(true);
        }
    },[user])
    return (
        <div className="lg:w-[200px] w-full bg-white shadow text-left p-2 rounded lg:block ">
            <div>
                <p className = "font-semibold">My Account</p>
                <Link to="/dashboard/profile" className = "text-neutral-700">{user.name}</Link>
            </div>
            <hr/>
            <div className="flex flex-col gap-0.5 mt-2">
            {isAdmin && <Link to="/dashboard/category" className = "hover:bg-[#ffbb00] p-0.5 text-neutral-700 ">Category</Link>}
            {isAdmin &&<Link to="/dashboard/sub-category" className = "hover:bg-[#ffbb00] p-0.5 text-neutral-700 ">Sub-Category</Link>}
            {isAdmin && <Link to="/dashboard/products" className = "hover:bg-[#ffbb00] p-0.5 text-neutral-700 ">Products</Link>}
            {isAdmin && <Link to="/dashboard/upload-products" className = "hover:bg-[#ffbb00] p-0.5 text-neutral-700 ">Upload Products</Link>}
            <Link to="/dashboard/orders" className = "hover:bg-[#ffbb00] p-0.5 text-neutral-700 ">My Orders</Link>
            <Link to="/dashboard/address" className = "hover:bg-[#ffbb00] p-0.5 text-neutral-700 ">My Address</Link>
            <button onClick={logoutUser} className = "hover:bg-red-400 text-neutral-700 "> Log out</button>
            </div>
            
        </div>
    )
}