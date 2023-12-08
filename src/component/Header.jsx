import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaArrowCircleLeft, FaHome, FaPenAlt, FaSearch, FaShoppingBag, FaShoppingBasket, FaShoppingCart, FaUserAlt} from 'react-icons/fa'
import { auth, db } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUserName, selectUserRole } from '../redux/authSlice'
import { doc, getDoc } from 'firebase/firestore'
import { ShowOnLogin, ShowOnLogout } from './HiddenLinks'
import { selectCartItems } from '../redux/cartSlice'
import { store_filter } from '../redux/filterSlice'
import useFetchCollection from '../customhook/useFetchCollection'
import { selectProducts, store_product } from '../redux/productSlice'
const Header = () => {
    const [search,setSearch]=useState('')
    const userName=useSelector(selectUserName)
    const userRole=useSelector(selectUserRole)
    const cartItem=useSelector(selectCartItems)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    let handleLogout=()=>{
        signOut(auth).then(() => {
            toast.success("loggedout successfully")
            navigate('/') }).catch((error) => {
            toast.error(error.message)
          }) }
    useEffect(()=>{
        onAuthStateChanged(auth, async(user) => {
            if (user) {
                   const uid = user.uid;
                   const docRef=doc(db,"users",uid)
                   const docSnap=await getDoc(docRef)
                   let obj={userName:docSnap.data().username,
                    userEmail:docSnap.data().email,
                    userId:uid,userRole:docSnap.data().role}
                   dispatch(login(obj))
            } else {
                dispatch(logout())
            }
          });
    })
    useEffect(()=>{
        window.addEventListener('beforeunload', ()=>handleLogout());
    },[])
    const {data}=useFetchCollection("products")
    useEffect(()=>{
        dispatch(store_product({products:data}))
    },[data])
    const products=useSelector(selectProducts)

    useEffect(()=>{
        dispatch(store_filter({search,products}))
    },[search])
    
    let handleSearch=(e)=>{
        e.preventDefault()
       dispatch(store_filter({search,products}))
    }
  return (
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">ecommerce</a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <Link class="nav-link active" to='/' aria-current="page"><FaHome/> Home <span class="visually-hidden">(current)</span></Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/products'><FaShoppingBag/> Products</Link>
                </li>
            </ul>
            <form class="d-flex my-2 my-lg-0" onSubmit={handleSearch}>
                <div className='input-group'>
                <input class="form-control" type="text" placeholder="Search" name="search"
                value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button class="btn btn-danger my-2 my-sm-0" type="submit"><FaSearch/></button>
                </div>
            </form>
            <ul class="navbar-nav mt-2 mt-lg-0">
                {userRole !='admin' &&
                <li class="nav-item">
                        <Link class="nav-link" to='/cart'><FaShoppingCart size={25}/> 
                        <span class="badge rounded-pill text-bg-danger" style={{position:'relative',top:'-10px'}}>{cartItem.length}</span>
                        </Link>
                </li>
                }
                <ShowOnLogout>
                    <li class="nav-item">
                        <Link class="nav-link" to='/register'><FaPenAlt/> Register</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to='/login'><FaUserAlt/>Login</Link>
                    </li>
                </ShowOnLogout>
              <ShowOnLogin>
                {userRole =='user' &&
                <li class="nav-item">
                            <Link class="nav-link" to='/myorders'>My Orders</Link>
                        </li>
                }
                    <li class="nav-item">
                        <a class="nav-link">Welcome {userName}</a>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" onClick={handleLogout}><FaArrowCircleLeft/> Logout</button>
                    </li>
                </ShowOnLogin>
            </ul>
        </div>
    </div>
  </nav>
  
  )
}

export default Header
