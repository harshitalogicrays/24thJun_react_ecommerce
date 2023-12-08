import { createSlice } from "@reduxjs/toolkit";
const filterSlice=createSlice({
name:"filter",initialState:{filters:[]},
reducers:{
    store_filter(state,action){
        let {search,products}=action.payload
        let filterproducts=products.filter((product,i)=>product.name.includes(search) || product.category.includes(search))
        state.filters=filterproducts
    }}
})
export const {store_filter}=filterSlice.actions
export default filterSlice.reducer
export const selectfilters=(state)=>state.filter.filters