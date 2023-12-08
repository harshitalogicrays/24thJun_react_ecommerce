import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ADD_TO_CART } from '../redux/cartSlice'

const ProductItem = ({product}) => {
  const dispatch=useDispatch()
  let addtocart=()=>{
    dispatch(ADD_TO_CART(product))
  }
  return (
    <div className='col-3'>
        <div class="card">
            <Link to={`/productdetails/${product.id}`}>
            <img class="card-img-top" src={product.imageURL} height='200px' alt={product.name}/>
            </Link>
            <div class="card-body">
            <Link to={`/productdetails/${product.id}`} class="card-title text-decoration-none">
                <h4 class="card-title">{product.name}</h4>
                </Link>
                <p class="card-text">{product.category}</p>
                <p class="card-text">{product.brand}</p>
                <button type="button" class="btn btn-danger" onClick={addtocart}>Add to Cart</button>
            </div>
        </div>
    </div>
  )
}

export default ProductItem
