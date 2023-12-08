import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import Loader from '../component/Loader'

const Register = () => {
  let [user,setUser]=useState({username:"",email:'',password:'',cpassword:'',role:'user'})
    let [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    let registerUser=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(async(userCredential) => {
          const user1 = userCredential.user;
          const docRef=doc(db,"users",user1.uid)
          await setDoc(docRef,{...user,createdAt:Timestamp.now().toDate()})
          toast.success('registered successfully')
          setIsLoading(false)
          navigate('/')
        })
        .catch((error) => {
          setIsLoading(false)
          toast.error(error.message)
        });     
    }
  return (
    <div className='container mt-5 shadow p-3'>
      {isLoading && <Loader/>}
        <div className='row'>
          <div className='col-4'>
            <img src={require('../assets/register.png')} className='img-fluid'/>
          </div>
          <div className='col-8'>
              <h4>Register</h4><hr/>
              <form onSubmit={registerUser}>
            <div class="mb-3">
              <label for="" class="form-label">Username</label>
              <input type="text" name="username" id="" class="form-control" placeholder="" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}/>
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Email</label>
              <input type="text" name="email" id="" class="form-control" placeholder=""  value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Password</label>
              <input type="password" name="password" id="" class="form-control" placeholder=""  value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Confirm Password</label>
              <input type="text" name="cpassword" id="" class="form-control" placeholder=""  value={user.cpassword} onChange={(e)=>setUser({...user,cpassword:e.target.value})}/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <hr/>
                <p>Already an Account <Link to='/login'>SignIn</Link></p>
        </form>
          </div>
        </div>
    </div>
  )
}

export default Register
