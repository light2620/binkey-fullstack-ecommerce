import { IoClose } from "react-icons/io5";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import emptycart from "../assets/empty_cart.webp"
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setTotalPrice,setTotalQty } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
export default function CartModel({close}){
    const cart = useSelector((state) => state.cart.cart);
    const totalQty = useSelector((state) => state.cart.totalQty)
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    function redirectToCheckout(){
        close()
        navigate("/checkout")
    }
    return (
        <div className="fixed  z-50 top-0 bottom-0 left-0 right-0 flex justify-end"  
        style={{backgroundColor: 'rgba(31, 41, 55, 0.6)'}}>
            
            <div className="h-[100vh] w-[420px] bg-blue-100 flex flex-col gap-2">
                   
                      {/* cart close button */}
                <div
                onClick={close}
                className="flex bg-white  items-center p-3 px-4 justify-between rounded cursor-pointer">
                    <div className="text-xl text-zinc-800 font-semibold">Cart</div>
                    <IoClose size={37}/>
                </div>
                    {/* cart close button */}





                   {/* cart itema and bill total */}
                {
                    cart.length > 0 ? (
                   <div className="h-[80%] w-full bg-blue-100 flex flex-col p-2 ">
                   <div className="h-[80%] w-full rounded bg-white flex flex-col gap-4 overflow-y-scroll p-2  ">
                     {
                        cart.map((item,index) => {
                            return (
                        <div className="flex  w-full gap-4">
                            <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                                <img src={item.productId.image[0]}  alt={item.productId.name} className="object-scale-down" />
                            </div>

                            <div className="w-full max-w-sm text-md">
                                <p className="text-sm text-ellipsis line-clamp-2">{item.productId.name}</p>
                                <p className="text-neutral-400 ">{item.productId.unit}</p>
                                <p className="font-semibold ">₹{item.productId.price}</p>
                            </div>
                            
                            <div className="">
                               <AddToCartButton data={item.productId} />
                            </div> 

                        </div>
                            )
                        })
                        

                            
                        
                     }
                   </div>
                   <div className="bg-white w-full rounded p-4">
                    <h1 className="font-bold text-2xl text-zinc-800">Bill  details</h1>
                    <div className="flex justify-between font-light text-lg">
                        <p>Items total</p>
                        <p>{totalPrice}</p>
                    </div>
                    <div className="flex justify-between font-light text-lg">
                        <p>Quantity total</p>
                        <p>{totalQty}</p>
                    </div>
                    <div className="flex justify-between font-light text-lg">
                        <p>Delviery Charge</p>
                        <p>Free</p>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-zinc-800">
                        <p>Grand total</p>
                        <p>{totalPrice}</p>
                    </div>
                    
                   </div>
                        </div>

                    ) : (
                        <div className="h-[80%] w-full bg-blue-100 p-1 ">
                            <div className="bg-white w-full h-full flex flex-col  items-center  justify-center rounded">
                                  <img  src={emptycart} alt="empty cart" className="object-scale-down"  />
                                  <Link onClick={close} to="/" className="p-2 text-white bg-green-600 rounded">Show Now</Link>
                            </div>

                        </div>
                            
                    )
                }
                
                  {/* cart itema and bill total */}









                 {/* proceed button */}
                 <div className="flex bg-white p-2 items-start justify-center h-[16vh]">
                    {
                        cart.length > 0 && (
                        <div
                        onClick={redirectToCheckout}
                        className="w-full h rounded bg-green-700 text-white flex items-center justify-between p-3 text-xl font-bold">
                        <p>234</p>
                        <div className="flex items-center gap-2">
                           <p className="text-xl">Proceed</p>
                           <FaCaretRight size={20} />
                        </div>
                   </div>)
                    }
                    
                 </div>

                 {/* proceed button */}

            
            </div>
            
        </div>
    )
}