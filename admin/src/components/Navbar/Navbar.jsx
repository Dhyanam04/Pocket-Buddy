import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/admin_assets/assets'
import logo from '../../assets/admin_assets/logo-img.png'

const Navbar = () => {
  return (
    <>
    <div className='navbar'>
      <img src={logo} className='logo' alt="" />
      <img className='profile' src={assets.profile_image} alt="" />
    </div>

    </>
  )
}

export default Navbar