import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectProducts } from '../redux/productSlice'
import useFecthDocument from '../customhook/useFecthDocument'
import ReactImageMagnify from 'react-image-magnify'
import Loader from './Loader'
import { ADD_TO_CART, DECREASE, selectCartItems } from '../redux/cartSlice'

const ProductDetails = () => {
  const {id}=useParams()
  const dispatch=useDispatch()
  // const products=useSelector(selectProducts)
  // const product=products.find((item)=>item.id==id)
  
  const {documentdata}=useFecthDocument("products",id) 
  let [product,setProducts]=useState(null)
  let cartItems=useSelector(selectCartItems)
  let itemIndex=cartItems.findIndex((item,i)=>item.id==id)
  let item=cartItems.find((item,i)=>item.id==id)
  useEffect(()=>{
    setProducts(documentdata)
},[documentdata]) 
   return (
    <>
    {product == null ? <Loader/> :
    <div className='container mt-5 '>
    <div className='row shadow'>
        <div className='col-5 p-2'>
        {/* <img src={product.imageURL} class="img-fluid" height='400px' width='400px'/> */}
        <ReactImageMagnify {...{
          smallImage: {
              alt: product.name,
              // isFluidWidth: true,
              width: 400,
              height: 400,
              src:product.imageURL
          },
          largeImage: {
              src: product.imageURL,
              width: 1200,
              height: 1800
    }
}} />
        </div>
        <div className='col-5 p-2'>
        <h4 class="card-title">{product.name}</h4>               
         <p class="card-text">{product.category}</p>
        <p class="card-text">{product.brand}</p>
        <p class="card-text">{product.desc}</p>

        {itemIndex == -1 ? 
         <button type="button" class="btn btn-danger" onClick={()=>dispatch(ADD_TO_CART(product))}>Add to Cart</button>
          :
          <>
           <button onClick={()=>dispatch(DECREASE(item))}>-</button>
          <input type="text" style={{width:'40px'}} value={item.cartQuantity} className='text-center'  readOnly></input>
          <button onClick={()=>dispatch(ADD_TO_CART(item))}>+</button>
          </>
        }
       
              
       
        </div>
    </div>
    </div>
}
    </>
  )
}

export default ProductDetails
