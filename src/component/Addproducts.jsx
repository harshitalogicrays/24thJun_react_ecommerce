import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import React, {  useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../firebase/config'
import { toast } from 'react-toastify'
import Loader from './Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useSelector } from 'react-redux'
import { selectProducts } from '../redux/productSlice'

const Addproducts = () => {
    const {id}=useParams()
    let categories=["kids","men","women","grocery","electronics"]
    let initialState={category:'',name:'',brand:'',price:'',countInstock:'',imageURL:'',desc:''}
    let [product,setProduct]=useState({...initialState})
    let [uploadProgress,setUploadProgress]=useState(0)
    let [isLoading,setIsLoading]=useState(false)
    let navigate=useNavigate()
    let allproducts=useSelector(selectProducts)
    let productEdit=allproducts.find((item,i)=>item.id==id)
    useEffect(()=>{
        if(id){
          setProduct(productEdit)
        }
        else{setProduct({...initialState})}
    },[id])
    let handleImage=(e)=>{
      let file=e.target.files[0]
      const storageRef=ref(storage,`24thjun-ecommerce/${Date.now()}`)
      const uploadTask=uploadBytesResumable(storageRef,file)
      uploadTask.on("state_changed",(snapshot)=>{
        const progress=(snapshot.bytesTransferred /snapshot.totalBytes)*100
        setUploadProgress(progress)
      },(error)=>{toast.error(error.message)},
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
          setProduct({...product,imageURL:url})
        })
      }
      )
    }

    let handleProduct=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        if(!id){
        try{
         addDoc(collection(db,"products"),{
          category:product.category,
          name:product.name,
          brand:product.brand,
          price:product.price,
          countInstock:product.countInstock,
          desc:product.desc,
          imageURL:product.imageURL,
          createdAt:Timestamp.now().toDate()
         })
         setIsLoading(false)
         toast.success("product added")
         navigate('/admin/viewproducts')
        }
        catch(err){ setIsLoading(false);toast.error(err.message)}     
      }
      else{
        if(product.imageURL != productEdit.imageURL){
          deleteObject(ref(storage,productEdit.imageURL))
        }
        try{
          setDoc(doc(db,"products",id),{
           category:product.category,
           name:product.name,
           brand:product.brand,
           price:product.price,
           countInstock:product.countInstock,
           desc:product.desc,
           imageURL:product.imageURL,
           createdAt:productEdit.createdAt,
           editedAt:Timestamp.now().toDate()
          })
          setIsLoading(false)
          toast.success("product updated")
          navigate('/admin/viewproducts')
         }
         catch(err){ setIsLoading(false);toast.error(err.message)}     
      } 
    }
  return (
    <div className='col-10 ms-5'>
      {isLoading && <Loader/>}
        <h1>{id?"Edit":"Add"} Product</h1><hr/>
        <form onSubmit={handleProduct}>
        <div class="mb-3">
            <label for="" class="form-label">Categories</label>
            <select class="form-select" name="category" value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})} id="">
                <option value=''>-----choose category-----</option>
                {categories.map((c,i)=><option key={i}>{c}</option>)}
            </select>
        </div>
        <div className='row'>
        <div class="mb-3 col-6">
          <label for="" class="form-label">Name</label>
          <input type="text"
            class="form-control" name="name" value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})}   placeholder="" />
          
        </div>
        <div class="mb-3 col-6">
          <label for="" class="form-label">Brand</label>
          <input type="text"
            class="form-control" name="brand" value={product.brand} onChange={(e)=>setProduct({...product,brand:e.target.value})}   placeholder="" />
          
        </div>
        </div>
        <div className='row'>
        <div class="mb-3 col-6">
          <label for="" class="form-label">Price</label>
          <input type="number"
            class="form-control" name="price" value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})}   placeholder="" />
          
        </div>
        <div class="mb-3 col-6">
          <label for="" class="form-label">countInStock</label>
          <input type="number"
            class="form-control" name="countInstock" value={product.countInstock} onChange={(e)=>setProduct({...product,countInstock:e.target.value})}   placeholder="" />
          
        </div>
        </div>
        {
          uploadProgress == 0 ? null :
          <div class="progress" role="progressbar">
            <div class="progress-bar" style={{width:`${uploadProgress}%`}}>
              {uploadProgress < 100 ? `Uploading ${uploadProgress}%`: `Upload Complete ${uploadProgress}%`}
            </div>
            </div>
        }
        <div class="mb-3">
          <label for="" class="form-label">imageURL</label>
          <input type="file" class="form-control" name="imageURL"  onChange={handleImage}  placeholder="" />
          
        </div>
        {id  && <img src={product.imageURL} height='50px' width='50px'/>}
        <div class="mb-3">
          <label for="" class="form-label">Description</label>
          <textarea class="form-control" name="desc" value={product.desc} onChange={(e)=>setProduct({...product,desc:e.target.value})}  rows="3">{product.desc}</textarea>
        </div>
        <button type="submit" class="btn btn-primary">{id?"Update":"Add"} Product</button>
        </form>
    </div>
  )
}

export default Addproducts
