import React from 'react'
import "./navbar.css"
import { assets } from '../../assets/admin_assets/assets'
function Navbar() {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="logo" />
      <img className="profile" src={assets.profile_image} alt="profile_image" />
    </div>
  );
}

export default Navbar
