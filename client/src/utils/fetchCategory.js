import { getAllCategoryApi } from "../api/category.api";
import { setCategoryLoading } from "../redux/product.Slice";

const fetchCategory = async(dispatch,setCategory) => {
    try{
        dispatch(setCategoryLoading(false))
        const response = await getAllCategoryApi();
        dispatch(setCategory(response.data.data))
        dispatch(setCategoryLoading(true));
         
    }catch(err){
        throw err
    }
}

export {fetchCategory}