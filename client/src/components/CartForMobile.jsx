import { useSelector } from "react-redux"
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa";
import CartModel from "./CartModel";
import { useState } from "react";
import { useLocation } from "react-router-dom";
export default function CartMobile(){
     const [cartModelDisplay, setCartModelDisplay] = useState(false);
    const cart = useSelector((state) => state.cart.cart);
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const location = useLocation();

   
    return cart.length !== 0 &&  location.pathname !== "/checkout" && <div>
          <div className="fixed flex p-2 items-center justify-between bottom-30 w-full  lg:hidden  bg-green-600 rounded shadow">
            <div className="flex items-center h-full gap-2">
                <div className= " flex rounded items-center justify-center bg-green-400 w-10 h-10 p-3 ">
                <FaCartShopping size={20} color="white"/>
                </div>
                <div className="text-white">
                    <p>{cart.length} items</p>
                    <p>₹{totalPrice}</p>
                </div>
            </div>
            <div 
            onClick={()=> setCartModelDisplay(!cartModelDisplay)}
            className="text-white text-xl flex items-center gap-2">
                <p>view cart</p>
                <FaCaretRight className="mt-1" />
            </div>
            
    </div>
    {cartModelDisplay && <CartModel close = {()=> setCartModelDisplay(!cartModelDisplay)} />}

    </div>
        
   
}