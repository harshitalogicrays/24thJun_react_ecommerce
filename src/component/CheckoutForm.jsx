import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSummary from './CheckoutSummary'
import { toast } from 'react-toastify'
import { selectUserEmail, selectUserId } from '../redux/authSlice'
import { EMPTY_CART, selectCartItems, selectCartTotalAmount } from '../redux/cartSlice'
import { selectShippingaddress } from '../redux/checkoutSlice'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'
import emailjs from '@emailjs/browser';

const CheckoutForm = () => {
    let [message,setMessage]=useState(null)
    let [isLoading,setIsLoading]=useState(false)
    const stripe=useStripe()
    const elements=useElements()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        const clientSecret=new URLSearchParams(window.location.search).get("payment_intent_cleint_secret")
    },[stripe])

    let userId=useSelector(selectUserId)
    let userEmail=useSelector(selectUserEmail)
    let cartItems=useSelector(selectCartItems)
    let totalAmount=useSelector(selectCartTotalAmount)
    let shippingAddress=useSelector(selectShippingaddress)

    let saveorder=()=>{
        let date=new Date()
        let orderDate=date.toLocaleDateString()
        let orderTime=date.toLocaleTimeString()
        let orderConfig={
            orderDate,orderTime,userEmail,userId,cartItems,shippingAddress,totalAmount,
            status_message:"Order Placed",
            createdAt:Timestamp.now().toDate()
        }
        setIsLoading(true)
        try{
            addDoc(collection(db,"orders"),orderConfig)

            emailjs.send('service_q9maptp', 'template_62hpedi', 
            {user_email:userEmail,order_status:orderConfig.status_message,amount:totalAmount}, 'ouyyULNr1Fl9QYxiJ')
            .then((result) => {
                setIsLoading(false)
                toast.success("order saved")
                dispatch(EMPTY_CART())
                navigate('/checkout-success')
            }, (error) => {
                setIsLoading(false);toast.error(error.message)
            });
            
        }
        catch(err){ setIsLoading(false);toast.error(err.message)}  

    }

    let handleSubmit=async(e)=>{
        e.preventDefault()
        setMessage(null)
        setIsLoading(true)
       const confirmPayment=await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:"http://localhost:30000/checkout-success"
            },
            redirect:"if_required"
        }).then((result)=>{
            if(result.error){
                toast.error(result.error)
                setMessage(result.error)
                return;
            }
            if(result.paymentIntent){
                if(result.paymentIntent.status=='succeeded'){
                    setIsLoading(false)
                    toast.success("payment done")
                   saveorder()
                }
            }
        }).catch(()=>toast.error("something went wrong"))
    }
    return (
    <div className='container shadow mt-5 p-2'>
        <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-6'>
                        <CheckoutSummary/>
                    </div>
                    <div className='col-6'>
                           <h1>Stripe Checkout</h1>
                           <hr/>
                           <PaymentElement></PaymentElement>
                           <div class="d-grid gap-2">
                             <button type="submit" name="" id="" class="btn btn-primary">
                                {isLoading ?  
                                    <div class="spinner-border text-warning" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                  </div>
                                :
                                <>(Pay Now)</>
                                }</button>
                           </div>
                           {message && <h3>{message}</h3>}
                    </div>
                </div>
        </form>    
    </div>
  )
}

export default CheckoutForm
