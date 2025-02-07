import { getCartItemApi } from "../api/cart.api";
import { setCart } from "../redux/cartSlice";

async function fetchCart(dispatch){
       try{
         const response  = await getCartItemApi()
   
         dispatch(setCart(response.data.data))
       }catch(err){
      
       }
}


export {fetchCart}