import React, { useState } from "react";
import useFecthDocument from "../customhook/useFecthDocument";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';
const ChangeOrderStatus = ({ id, orderStatus, order }) => {
  let statusMessage = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Completed",
    "Cancelled",
    "Delivered",
  ];
  let [status, setStatus] = useState(orderStatus);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let handleSubmit=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    let orderConfig={
      orderDate:order.orderDate,
      orderTime:order.orderTime,
      userEmail:order.userEmail,
      userId:order.userId,
      cartItems:order.cartItems,
      shippingAddress:order.shippingAddress,
      totalAmount:order.totalAmount,
      status_message:status,
      createdAt:order.createdAt,
      editedAt:Timestamp.now().toDate()
  }
    try{
      setDoc(doc(db,"orders",id),orderConfig)
      emailjs.send('service_q9maptp', 'template_62hpedi', 
      {user_email:orderConfig.userEmail,order_status:orderConfig.status_message,amount:orderConfig.totalAmount}, 'ouyyULNr1Fl9QYxiJ')
      .then((result) => {
        setIsLoading(false)
        toast.success("order status updated")
        navigate('/admin/orders')
      }, (error) => {
          setIsLoading(false);toast.error(error.message)
      });

  }
  catch(err){ setIsLoading(false);toast.error(err.message)} 
  }
  return (
    <div className="card p-2">
      {isLoading && <Loader/>}
      <h2>Update Order Status</h2>
      <form onSubmit={handleSubmit}>
      <div className="col-6">
      <label for="" class="form-label">
              Order Status
            </label>
          <div class="input-group">
            
            <select
              class="form-select"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusMessage.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          
          <button type="submit" class="btn btn-primary">
            Update Status
          </button>
          </div>
          </div>
        </form>
     
    </div>
  );
};

export default ChangeOrderStatus;
