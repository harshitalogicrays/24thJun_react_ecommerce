import { createSlice } from "@reduxjs/toolkit";
const checkoutSlice = createSlice({
  name: "checkout",
  initialState: { shippingAddress: sessionStorage.getItem('shippingAddress') != null ? 
                                  JSON.parse(sessionStorage.getItem('shippingAddress') ) :{} },
  reducers: {
    store_shippingAddress(state, action) {
      state.shippingAddress = action.payload;
      sessionStorage.setItem("shippingAddress",JSON.stringify(state.shippingAddress))
    },
  },
});
export const { store_shippingAddress } = checkoutSlice.actions;
export default checkoutSlice.reducer;
export const selectShippingaddress = (state) => state.checkout.shippingAddress;
