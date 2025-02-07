import { getAllProductsApi } from "../api/product.api";


async function fetchAllProducts (dispatch,setProducts){
         try{
       
          const response = await getAllProductsApi();
   
              dispatch(setProducts(response.data.data));
         
         }catch(err){
             console.log(err )
         }
}

export {fetchAllProducts}