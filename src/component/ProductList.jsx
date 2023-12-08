import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({products}) => {
  return (
    <div className='container mt-4'>
      {products.length ==0 && <h1>No product found</h1>}
      <div className='row'>
        {products.map((product)=><ProductItem key={product.id} product={product}/>)}
      </div>
    </div>
  )
}

export default ProductList
