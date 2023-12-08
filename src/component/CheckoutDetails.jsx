import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import { CountryDropdown } from 'react-country-region-selector'
import { useDispatch, useSelector } from 'react-redux'
import { selectShippingaddress, store_shippingAddress } from '../redux/checkoutSlice'
import { useNavigate } from 'react-router-dom'

const CheckoutDetails = () => {
    let [shippingAddress,setShippingAddress]=useState({name:'',phone:'',pincode:'',line1:'',line2:'',city:'',state:'',country:''})
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(store_shippingAddress(shippingAddress))
        navigate('/checkout')
    }

    let address=useSelector(selectShippingaddress)
    useEffect(()=>{
        setShippingAddress(address)
    },[address])
  return (
    <div className='container mt-5'>
        <div className='row shadow p-2'>
            <div className='col-6'>
                <h1>Checkout Details</h1><hr/>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                    <div class="mb-3 col-6">
                  <label for="" className="form-label">Name</label>
                  <input type="text"
                    className="form-control" name="name" value={shippingAddress.name} onChange={(e)=>setShippingAddress({...shippingAddress,name:e.target.value})} id="" aria-describedby="helpId" placeholder="name"/>
                </div>
                <div class="mb-3 col-6">
                  <label for="" className="form-label">phone</label>
                  <input type="number"
                    className="form-control" name="phone" id="" aria-describedby="helpId" placeholder="phone" value={shippingAddress.phone} onChange={(e)=>setShippingAddress({...shippingAddress,phone:e.target.value})}/>
                </div>

                    </div>
               <div className='row'>
               <div class="mb-3 col-6">
                  <label for="" className="form-label">PinCode</label>
                  <input type="number"
                    className="form-control" name="pincode" id="" aria-describedby="helpId" placeholder="pincode" value={shippingAddress.pincode} onChange={(e)=>setShippingAddress({...shippingAddress,pincode:e.target.value})}/>
                </div>
                <div class="mb-3 col-6">
                  <label for="" className="form-label">city</label>
                  <input type="text"
                    className="form-control" name="city" value={shippingAddress.city} onChange={(e)=>setShippingAddress({...shippingAddress,city:e.target.value})} id="" aria-describedby="helpId" placeholder="City"/>
                </div>
               </div>
                <div className='row'>
                    <div class="mb-3 col-6">
                      <label for="" class="form-label">line1</label>
                      <input type="text" name="line1" id="" class="form-control" value={shippingAddress.line1} onChange={(e)=>setShippingAddress({...shippingAddress,line1:e.target.value})}/>                   
                    </div>
                    <div class="mb-3 col-6">
                      <label for="" class="form-label">line2</label>
                      <input type="text" name="line2" id="" class="form-control" value={shippingAddress.line2} onChange={(e)=>setShippingAddress({...shippingAddress,line2:e.target.value})}/>                   
                    </div>
                </div>
                <div class="mb-3">
                  <label for="" className="form-label">State</label>
                  <input type="text"
                    className="form-control" name="state" id="" aria-describedby="helpId" placeholder="State" value={shippingAddress.state} onChange={(e)=>setShippingAddress({...shippingAddress,state:e.target.value})}/>
                </div>
                <div class="mb-3">
                  <label for="" className="form-label">country</label>
                  <CountryDropdown className='form-select'
                    value={shippingAddress.country} valueType='short'
                    onChange={(val) => setShippingAddress({...shippingAddress,country:val})} />
                </div>
                <button type="submit" class="btn btn-danger">proceed to checkout</button>           

                </form>
            </div>
            <div className='col-6'>
                <CheckoutSummary/>
            </div>
        </div>
    </div>
  )
}

export default CheckoutDetails
