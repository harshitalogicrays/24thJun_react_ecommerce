import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const cartSlice=createSlice({
    name:"cart",
    initialState:{cartItems:[],cartTotalAmount:0,previousURL:null},
    reducers:{
        ADD_TO_CART(state,action){
            const productIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
           if(productIndex == -1){ //add
            state.cartItems.push({...action.payload,cartQuantity:1})
            toast.success(`${action.payload.name} added to cart`)
           }
           else { //increase
            if(state.cartItems[productIndex].cartQuantity < action.payload.countInstock){
                state.cartItems[productIndex].cartQuantity+=1
                toast.success(`${action.payload.name} qty increased by 1`)
            }
              else {toast.info(`${action.payload.name} out of stock`)}
           }
        },
        DECREASE(state,action){
            const productIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
            if(state.cartItems[productIndex].cartQuantity  > 1){ //add
                state.cartItems[productIndex].cartQuantity-=1
             toast.success(`${action.payload.name} qty decreased by 1`)
            }
            else { 
                    state.cartItems[productIndex].cartQuantity=1                
               
               }
        },
        REMOVE_FROM_CART(state,action){
            state.cartItems.splice(action.payload,1)
        },
        EMPTY_CART(state,action){
            state.cartItems=[]
            state.cartTotalAmount=0
        },
        SAVE_URL(state,action){
            state.previousURL=action.payload
        },
        CALCULATE_TOTAL(state,action){
            const total=state.cartItems.reduce((prev,curr)=>{return prev += (curr.price * curr.cartQuantity)},0)
            state.cartTotalAmount=total
        }
    }
})
export const {ADD_TO_CART,DECREASE,REMOVE_FROM_CART,EMPTY_CART,CALCULATE_TOTAL,SAVE_URL}=cartSlice.actions
export default cartSlice.reducer
export const selectCartItems=(state)=>state.cart.cartItems
export const selectCartTotalAmount=(state)=>state.cart.cartTotalAmount
export const selectURL=(state)=>state.cart.previousURL