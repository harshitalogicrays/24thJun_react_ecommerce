import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalAmount } from '../redux/cartSlice'

const CheckoutSummary = () => {
    const cartItems=useSelector(selectCartItems)
    const total=useSelector(selectCartTotalAmount)
  return (
    <div>
      <h1>Checkout Summary</h1><hr/>
       
        {cartItems.map((c)=>
            <div className='card ps-2'>
                <p>Name: {c.name}</p>
                <p>Qty:{c.cartQuantity}</p>
                <p>Unit Price {c.price}</p>
            </div>
        )}
         <div className='card p-2'>
            <h4>Products : {cartItems.length}</h4>
            <h4>Total Amount: {total}</h4>
        </div>
    </div>
  )
}

export default CheckoutSummary

