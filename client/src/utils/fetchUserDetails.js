import { getUserDetailsApi } from "../api/user.api";
import { setUser } from "../redux/userSlice";
const fetchUserDetails = async(dispatch) =>{
    try{
         const response = await getUserDetailsApi();
         
         dispatch(setUser(response.data.data))
    }catch(err){
     
    }
  }

  export {fetchUserDetails}