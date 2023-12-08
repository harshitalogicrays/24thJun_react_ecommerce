import React, { useEffect } from 'react'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import { FaPen } from 'react-icons/fa'
import { selectorders, store_orders } from '../redux/orderSlice'
import { selectUserId } from '../redux/authSlice'

const MyOrders = () => {
    const {data,isLoading}=useFetchCollection("orders")
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(store_orders({orders:data}))
    },[data])
    let orders=useSelector(selectorders)
    let userId=useSelector(selectUserId)
    let filterOrders= orders.filter((item,i)=>item.userId==userId)
    return (
    <div className='container shadow p-2  mt-5 col-11'>
    {isLoading && <Loader/>}
    <h1>My Orders</h1><hr/>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Order Date and Time</th>                
                    <th scope="col">Amount</th>
                    <th scope="col">Order Status</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
                {filterOrders.length == 0 && <tr><td colSpan={4}>No Order Found</td></tr>}
                {filterOrders.map((order)=>
                    <tr key={order.id}>
                        <td scope="row">{order.id}</td>
                        <td>{order.orderDate} at {order.orderTime}</td>                     
                        <td>{order.totalAmount}</td>
                        <td scope="row" className={
                            order.status_message != 'Delivered'? "text-danger":"text-success"
                        }>{order.status_message}</td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-primary"
                            >
                                View Order
                            </button>
                            
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    
</div>
  )
}

export default MyOrders
