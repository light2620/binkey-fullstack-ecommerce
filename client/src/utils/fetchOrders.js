import { getAllOrderApi } from "../api/orders.api";
import { setOrder } from "../redux/orderSlice";

async function fetchOrder(dispatch) {
    try{
         const response = await getAllOrderApi();
   
          dispatch(setOrder(response.data.data))
    }catch(err){  
        console.log(err);
    }
}

export {fetchOrder};