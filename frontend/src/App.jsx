import React, { useState , useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Link, Route, Routes } from 'react-router-dom'
// import {Home} from './pages/Home/Home'
// if we do see in commented part of export in pages home if not default then we enclose it in {}
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
// import { StoreContext } from '../../context/StoreContext';

const App = () => {
  // const { cartItems } = useContext(StoreContext);
  // console.log("Cart from context:", cartItems);
  
  const [showLogin , setShowLogin] = useState(false);

  return (
    <>

    {showLogin?<LoginPopup setShowLogin = {setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin = {setShowLogin}/>
      {/* {console.log(showLogin + " this is value of set show login")} */}
      <Routes>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/cart" element = {<Cart/>}></Route>
        <Route path = "/order" element = {<PlaceOrder/>}></Route>
        <Route path = "/verify" element = {<Verify/>}></Route>
        <Route path = "/myorders" element = {<MyOrders/>}></Route>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App