import { getAllAddressApi } from "../api/address.api";
import { setAddresses } from "../redux/addressSlice";

async function fetchAddress(dispatch){
    try{
       const response = await getAllAddressApi()
     
       dispatch(setAddresses(response.data.data))
    }catch(err){
        console.log(err)
    }
}

export {fetchAddress}