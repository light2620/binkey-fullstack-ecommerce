import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name : "cart",
    initialState : {
        cart : [],
        totalQty : 0,
        totalPrice : 0,

    },
    reducers : {
        setCart : (state,action) => {
            state.cart = action.payload
        },
        setTotalQty : (state,action) => {
       
            state.totalQty = action.payload
        },
        setTotalPrice : (state,action) => {
            state.totalPrice = action.payload
        }
    }
})


export const {setCart,setTotalPrice,setTotalQty} = cartSlice.actions
export default cartSlice.reducer