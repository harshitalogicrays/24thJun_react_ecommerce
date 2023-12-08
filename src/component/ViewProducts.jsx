import React, {  useEffect, useState } from 'react'
import useFetchCollection from '../customhook/useFetchCollection'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_product } from '../redux/productSlice'
import { Link } from 'react-router-dom'
import {FaPen, FaTrash} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../firebase/config'
const ViewProducts = () => {
    const {data,isLoading}=useFetchCollection("products")
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(store_product({products:data}))
    },[data])
    const products=useSelector(selectProducts)

    let deleteProduct=async(id,imageURL)=>{
        if(window.confirm('sure to delete??')){
            try{
               await deleteDoc(doc(db,"products",id))
               await deleteObject(ref(storage,imageURL))
               toast.success("product deleted")
            }
            catch(err){toast.error(err.message)}
        }
    }
      return (
    <div className='container shadow p-2  mt-5 col-11'>
        {isLoading && <Loader/>}
        <h1>All Products</h1><hr/>
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">stock</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length == 0 && <tr><td colSpan={7}>No Product Found</td></tr>}
                    {products.map((product)=>
                        <tr key={product.id}>
                            <td scope="row">{product.id}</td>
                            <td>{product.name}</td>
                            <td>
                                <img src= {product.imageURL} height='50px' width='50px'/>
                               </td>
                            <td scope="row">{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.countInstock}</td>
                            <td>
                                <Link type="button" class="btn btn-success me-2" 
                                to={`/admin/editproduct/${product.id}`}><FaPen/></Link>
                                <button type="button" class="btn btn-danger" onClick={()=>deleteProduct(product.id,product.imageURL)}><FaTrash/></button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
    </div>
  )
}

export default ViewProducts
