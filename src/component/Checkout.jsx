import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartTotalAmount } from '../redux/cartSlice'
import { selectShippingaddress } from '../redux/checkoutSlice'
import { selectUserEmail } from '../redux/authSlice'
import { toast } from 'react-toastify'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
const stripePromise=loadStripe('pk_test_51NOvqGSAvExKFAjaCl4fAxmf3CFJlq54guOtblHh0nEuB7XGZ9KXvKSgHgjjiIc0kexx4SUn67Z4iXDBB9q3fevA0096oZR8bw')
const Checkout = () => {
  const [message,setMessage]=useState("Initializing checkout")
  const [clientSecret,setclientSecret]=useState('')
  const amount=useSelector(selectCartTotalAmount)
  const shippingAddress=useSelector(selectShippingaddress)
  const userEmail=useSelector(selectUserEmail)
  const description=`description - ${userEmail} Stripe Payment`
  useEffect(()=>{
      fetch("http://localhost:2000/payment",{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify({amount,shippingAddress,description})
      }).then((res)=>{
        return res.json().then(
          (data)=>{
            console.log(data.clientSecret)
            setclientSecret(data.clientSecret)
          }).catch(()=>{
            setMessage("Failed to initialize checkout")
            toast.error("something went wrong")
          })
    })
  },[])

  const appearance={theme:'stripe'}
  const options={clientSecret,appearance}
  return (
    <div className='container'>
        {!clientSecret && <h3>{message}</h3>}
      {clientSecret && <Elements key={clientSecret} options={options} stripe={stripePromise}><CheckoutForm/></Elements>}
    </div>
  )
}

export default Checkout
