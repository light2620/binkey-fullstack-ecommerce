import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { addToCartApi, updateCartApi } from "../api/cart.api";
import toast from "react-hot-toast";
import { fetchCart } from "../utils/fetchCart";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { deleteItemFromCartApi } from "../api/cart.api";

export default function AddToCartButton({data}){
    const [isAlreadyInCart,setIsAlreadyInCart] = useState(false)
    const productId = data._id 
 
    const dispatch = useDispatch()
    const cart = useSelector((state) =>state.cart.cart);

    const [cartItemsDetail,setCartItemsDetail] = useState();
    const [qty,setQty] = useState();
    useEffect(()=> {
         setIsAlreadyInCart(cart.some(item => item.productId._id === productId))
         const product = cart.find((item) => item.productId._id === productId);
         setQty(product?.quantity);
         setCartItemsDetail(product)
         
    },[data,cart])

     async function addTocartItem(e,productId){
        e.preventDefault()
        e.stopPropagation()
        try{
          const response = await addToCartApi({productId,quantity:1})
          if(response.data.success){
            toast.success(response.data.message);
            fetchCart(dispatch);
          }
          
        }catch(err){
            if(err.response.data.error){
                toast.error("Login First")
               }
            console.log(err)
        }
     }
   async function increaseQty(e){
        e.preventDefault()
        e.stopPropagation()
        if(qty < 5){
        
           const response = await updateCartApi({id:cartItemsDetail?._id,qty : qty+1})
           if(response.data.success){
            toast.success(response.data.message);
            fetchCart(dispatch)
           }
           
           
        }else{
            toast.error("can not add more than 5")
        }
    }
    

    async function decreaseQty(e){
        e.preventDefault();
        e.stopPropagation();
        try{
           if(qty === 1){
            const response = await deleteItemFromCartApi({id : cartItemsDetail._id});
            console.log(response);
            if(response.data.success){
                toast.success("item removed from cart");
                fetchCart(dispatch)
                
            }
            return
           }
           const response = await updateCartApi({id:cartItemsDetail?._id,qty : qty-1})
           if(response.data.success){
            toast.success(response.data.message);
            fetchCart(dispatch)
           }
          
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            {
                isAlreadyInCart ? 
                <div className='flex w-full h-full'>
                        <button 
                      onClick={decreaseQty}
                        className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaMinus /></button>

                        <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

                        <button 
                        onClick={increaseQty}
                        className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaPlus /></button>
                    </div>
                
                :   <button onClick = {(e)=>addTocartItem(e,productId)} className="bg-green-600 :hover-green-100 text-white  text-lg px-4 py-1 rounded cursor-pointer">Add</button>
            }
          
        </div>
    )
}