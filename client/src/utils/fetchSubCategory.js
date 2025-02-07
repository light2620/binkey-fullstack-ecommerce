import { getAllSubCategoryApi } from "../api/subCategory.api";



async function fetchSubCategory(dispatch,setSubCategory){
          try{
                const response = await getAllSubCategoryApi();
                dispatch(setSubCategory(response.data.data));
              
          }catch(err){
            throw err
          }
} 

export {fetchSubCategory}