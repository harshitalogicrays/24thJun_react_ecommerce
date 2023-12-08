import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:null,userName:null,userEmail:null,userId:null,userRole:null},
    reducers:{
        login(state,action){
            let {userName,userEmail,userId,userRole}=action.payload
            state.isLoggedIn=true
            state.userName=userName
            state.userEmail=userEmail
            state.userId=userId
            state.userRole=userRole
        },
        logout(state,action){
            state.isLoggedIn=null
            state.userName=null
            state.userEmail=null
            state.userId=null
            state.userRole=null
        }
    }
})
export const {login,logout}=authSlice.actions
export default authSlice.reducer
export const selectIsLoggedIn=(state)=>state.auth.isLoggedIn
export const selectUserEmail=(state)=>state.auth.userEmail
export const selectUserName=(state)=>state.auth.userName
export const selectUserId=(state)=>state.auth.userId
export const selectUserRole=(state)=>state.auth.userRole