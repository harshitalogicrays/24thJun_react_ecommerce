import React, { useEffect } from 'react'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_product } from '../redux/productSlice'
import ProductList from './ProductList'
import { selectfilters } from '../redux/filterSlice'

const Products = () => {
  const {data,isLoading}=useFetchCollection("products")
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(store_product({products:data}))
  },[data])
  const products=useSelector(selectProducts)
  const filterProducts=useSelector(selectfilters)
  return (
    <> 
      {filterProducts.length !=0 ?
        <ProductList products={filterProducts}/>
    :
      <ProductList products={products}/>
    }
    
    </>
  )
}

export default Products
