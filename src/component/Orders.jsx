import React, { useEffect } from 'react'
import Loader from './Loader'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorders, store_orders } from '../redux/orderSlice'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
    const {data,isLoading}=useFetchCollection("orders")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(store_orders({orders:data}))
    },[data])
    let orders=useSelector(selectorders)
    let vieworder=(id)=>{
            navigate(`/admin/order-details/${id}`)
    }
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
                {orders.length == 0 && <tr><td colSpan={4}>No Order Found</td></tr>}
                {orders.map((order)=>
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
                                class="btn btn-primary" onClick={()=>vieworder(order.id)} 
                                disabled={order.status_message=='Delivered' && true}
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

export default Orders
