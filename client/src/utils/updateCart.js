import { updateCartApi } from "../api/cart.api";

async function updateCart(id,qty){
    try{ 
        const response = await updateCartApi({id,qty})
        return response

        
    }catch(err){
        console.log(err)
    }
}


export {updateCart}