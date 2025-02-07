import { createSlice } from "@reduxjs/toolkit"


const productSlice = createSlice({
    name : "product",
    initialState : {
        products : [],
        category : [],
        subCategory : [],
        categoryLoading : false,
        productLoading: false
    },
    reducers: {
        setCategory : (state,action) => {
            
            state.category = action.payload
        },
        setSubCategory: (state,action) => {
            state.subCategory = action.payload
        },
        setProducts : (state,action) => {
            state.products = action.payload
        },
        setCategoryLoading : (state,action) =>{
            state.categoryLoading = action.payload
        },
        setProductLoading : (state,action) =>{
            state.productLoading = action.payload
        }
    }
})


export const {setCategory,setSubCategory,setProducts,setCategoryLoading, setProductLoading} = productSlice.actions
export default productSlice.reducer