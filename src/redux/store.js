import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import checkoutSlice from "./checkoutSlice";
import filterSlice from "./filterSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store=configureStore({
    reducer:{auth:authSlice,
    product:productSlice,cart:cartSlice,
    checkout:checkoutSlice,
    order:orderSlice,
    filter:filterSlice}
})
export default store