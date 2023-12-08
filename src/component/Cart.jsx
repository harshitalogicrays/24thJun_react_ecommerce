import React, { useEffect } from 'react'
import {FaTrash} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL, DECREASE, EMPTY_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount } from '../redux/cartSlice'
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../redux/authSlice'
const Cart = () => {
  const cartItems=useSelector(selectCartItems)
  const total=useSelector(selectCartTotalAmount)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(CALCULATE_TOTAL())
  },[cartItems])
  let isLoggedIn=useSelector(selectIsLoggedIn) 
  let url=window.location.href
  let checkout=()=>{
    if(isLoggedIn)
      navigate('/checkout-details')
    else {
      dispatch(SAVE_URL(url))
      navigate('/login')
    }
  }
  return (
    <div className='container mt-5 shadow p-2'>
      <h1>Cart Page</h1> <hr/>
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length==0 && <tr><td colSpan={7}>No item in cart</td></tr>}
            {cartItems.map((c,i)=>
            <tr key={i}>
              <td scope="row">{i+1}</td>
              <td>{c.name}</td>
              <td><img src={c.imageURL} height='50px' width='50px'/></td>
              <td scope="row">{c.price}</td>
              <td>
                <button onClick={()=>dispatch(DECREASE(c))}>-</button>
                <input type="text" style={{width:'40px'}} className='text-center' value={c.cartQuantity}  readOnly></input>
                <button onClick={()=>dispatch(ADD_TO_CART(c))}>+</button>
                </td>
              <td> {c.price * c.cartQuantity}</td>
              <td><button type="button" class="btn btn-danger" onClick={()=>dispatch(REMOVE_FROM_CART(i))}>
                <FaTrash/></button></td>
            </tr>
            )} 
          </tbody>
        </table>
      </div>
      <div className='row'>
        <div className='col-10'>
          <button type="button" class="btn btn-danger btn-lg "  onClick={()=>dispatch(EMPTY_CART())}
         >Empty Cart</button>
        </div>
        <div className='col-2'>
          <h5>Total: <span className='float-end'>${total}</span></h5> <hr/>
          <div class="d-grid gap-2">
            <button type="button" name="" id="" class="btn btn-warning" onClick={checkout}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
