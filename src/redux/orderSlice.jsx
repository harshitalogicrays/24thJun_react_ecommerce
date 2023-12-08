import { createSlice } from "@reduxjs/toolkit";
const orderslice=createSlice({
name:"order",initialState:{orders:[]},
reducers:{
    store_orders(state,action){
        state.orders=action.payload.orders  }}
})
export const {store_orders}=orderslice.actions
export default orderslice.reducer
export const selectorders=(state)=>state.order.orders