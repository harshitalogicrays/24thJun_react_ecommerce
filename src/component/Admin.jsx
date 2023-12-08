import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { selectIsLoggedIn, selectUserRole } from '../redux/authSlice'
import Login from '../pages/Login'

const Admin = () => {
  let isLoggedIn=useSelector(selectIsLoggedIn)
  let role=useSelector(selectUserRole)
  return (
    <>
    {(isLoggedIn && role=="admin" ) ?
    <div className='row'>
      <div className='col-2'>
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="nav-item">
        <a href="#" class="nav-link text-dark py-3 border-bottom" aria-current="page" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
          <FaUserCircle size={40}/><br/>
         Dashboard
        </a>
      </li>
      <li>
        <Link to='addproduct' class="nav-link text-dark py-3 border-bottom" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
          Add Product
        </Link>
      </li>
      <li>
        <Link to='viewproducts' class="nav-link  text-dark py-3 border-bottom" title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
         View Products
        </Link>
      </li>
      <li>
        <a href="#" class="nav-link text-dark  py-3 border-bottom" title="Products" data-bs-toggle="tooltip" data-bs-placement="right">
         View Users
        </a>
      </li>
      <li>
        <Link to='/admin/orders' class="nav-link text-dark py-3 border-bottom" title="Customers" data-bs-toggle="tooltip" data-bs-placement="right">
        View Orders
        </Link>
      </li>
    </ul>
      </div>
      <div className='col-10'>
        <Outlet/>
      </div>
    </div> 
    
    :
    <Login/>
  }
  </>
  )
}

export default Admin
