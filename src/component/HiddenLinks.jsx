import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../redux/authSlice'

export const ShowOnLogin = ({children}) => {
   const isLoggedIn= useSelector(selectIsLoggedIn)
   if(isLoggedIn)
        return children
    else 
        return null
}

export const ShowOnLogout = ({children}) => {
    const isLoggedIn= useSelector(selectIsLoggedIn)
    if(isLoggedIn==null)
        return children
    else 
        return null
  }

