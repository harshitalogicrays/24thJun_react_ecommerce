import express from 'express'
import cors from 'cors'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NOvqGSAvExKFAjaTkSgqxNXs5WQ8TofJQrBOJIhdkFNDBKzqbWwMSYYzbsfP6ozzQ1n3sljsSbCVHYnMhcePzGz00PbYWzMiX');
const app=express()
app.use(express.json())
app.use(cors())
//http://localhost:2000
app.get('/:data',(req,res)=>{
    res.send(`${req.params.data} hello from server`)
})
//http://localhost:2000/payment
app.post('/payment',async(req,res)=>{
    console.log(req.body)
    let {amount,shippingAddress,description}=req.body
    const paymentIntend=await stripe.paymentIntents.create({
        amount:amount,
        currency:"usd",
        automatic_payment_methods:{enabled:true},
        description:description,
        shipping:{
            address:{
                line1:shippingAddress.line1, line2:shippingAddress.line2,
                city:shippingAddress.city, state:shippingAddress.state,
                country:shippingAddress.country },
            name:shippingAddress.name,phone:shippingAddress.phone  }
    })
     res.send({clientSecret:paymentIntend.client_secret})
})
let PORT=2000
app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})