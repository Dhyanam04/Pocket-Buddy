import React, { useContext, useState } from 'react'
import './Navbar.css'
// import '../../assets/logo-img.png'
import logo from '../../assets/logo-img.png'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets/frontend_assets/assets'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home")
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className='navbar'>
      {/* <img src="../src/assets/logo-img.png" alt="logo-image" className="logo" /> this can also be done src is relative to public folder thats why this path and import and all are relative to folder path thats why */}
      <Link to='/'><img src={logo} alt="logo-image" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => { setMenu("home") }} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("menu") }} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#' onClick={() => { setMenu("mobile-App") }} className={menu === "mobile-App" ? "active" : ""}>Mobile-App</a>
        <a href='#footer' onClick={() => { setMenu("contact-us") }} className={menu === "contact-us" ? "active" : ""}>Contact-us</a>
      </ul>
      <div className="navbar-right">
        <img src="../src/assets/assets/frontend_assets/search_icon.png" alt="nvbr-srh" className="navbar-search" />

        <div className="navbar-basket">
          <Link to='/cart'><img src="../src/assets/assets/frontend_assets/shopping-cart.png" alt="nvbr-bskt" className="navbar-basket" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : 'dot'}></div>
        </div>
        {!token ?
          <button onClick={() => { setShowLogin(true) }}>Sign-in</button> :
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar