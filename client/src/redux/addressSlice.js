import { createSlice } from "@reduxjs/toolkit";


const addressSlice = createSlice({
    name : "address",
    initialState : {
        addresses : []
    },reducers : {
        setAddresses : (state,action) => {
            state.addresses = action.payload
        }
    }
})


export const {setAddresses} = addressSlice.actions

export default addressSlice.reducer