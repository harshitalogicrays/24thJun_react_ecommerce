import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Products from "./component/Products";
import Admin from "./component/Admin";
import Addproducts from "./component/Addproducts";
import ViewProducts from "./component/ViewProducts";
import ProductDetails from "./component/ProductDetails";
import Cart from "./component/Cart";
import CheckoutDetails from "./component/CheckoutDetails";
import Checkout from "./component/Checkout";
import CheckoutSuccess from "./component/CheckoutSuccess";
import MyOrders from "./component/MyOrders";
import Orders from "./component/Orders";
import AOrderDetails from "./component/AOrderDetails";
function App() {
  return (
    <>
    <ToastContainer autoClose={2000} position="top-center"/>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin' element={<Admin/>}>
          <Route path='addproduct' element={<Addproducts/>}/>
          <Route path="viewproducts" element={<ViewProducts/>}/>
          <Route path='editproduct/:id' element={<Addproducts/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='order-details/:id' element={<AOrderDetails/>}/>
      </Route>
      <Route path='/productdetails/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout-details' element={<CheckoutDetails/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </>
    );
}

export default App;
