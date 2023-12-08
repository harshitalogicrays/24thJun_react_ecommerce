import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import Loader from '../component/Loader'
import { useSelector } from 'react-redux'
import { selectURL } from '../redux/cartSlice'

const Login = () => {
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  let url=useSelector(selectURL) //localhost:3000/cart
  let redirectURL=()=>{
    if(url !=null){
      if(url.includes('cart')){
        navigate('/cart')
      }
    }
      else {
        navigate('/')
      }
  }
  let loginUser=(e)=>{
    e.preventDefault()
   setIsLoading(true)
   signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const user = userCredential.user;
    const docRef=doc(db,"users",user.uid)
    const docSnap=await getDoc(docRef)
    let role=docSnap.data().role
    toast.success('loggedIn successfully')
    setIsLoading(false)
    if(role=="admin") navigate('/admin')
    else if(role=="user") redirectURL()
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });
  }
  const provider = new GoogleAuthProvider();
  let loginwithgoogle=()=>{
  
  signInWithPopup(auth, provider)
  .then(async(result) => {
     const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const docRef=doc(db,"users",user.uid)
    let role='user'
    await setDoc(docRef,{username:user.displayName,email:user.email,role:'user',createdAt:Timestamp.now().toDate()})
    toast.success('loggedIn successfully')
    redirectURL()
  }).catch((error) => {
    toast.error(error.message)
  });
  }
  return (
   <>
      {isLoading && <Loader/>}

    <div className='row mt-3' >
       <div className='col-4 offset-2'>
      <img src={require('../assets/login.png')} className='img-fluid'/>
    </div>
    <div className='col-4 mt-5'>
        <form onSubmit={loginUser}>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder=""/>
              <label for="formId1">Email</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control" name="password" placeholder="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <label for="formId1">Password</label>
            </div>
            <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">Login</button></div>
            <hr/>
            <div class="d-grid gap-2">
              <button type="button" name="" id="" class="btn btn-danger" onClick={loginwithgoogle}>Login with google</button>
              <hr/>
            </div>
            <p>Create an Account <Link to='/register'>SignUp</Link></p>
        </form>
    </div>
</div>
</> 
  )
}

export default Login
