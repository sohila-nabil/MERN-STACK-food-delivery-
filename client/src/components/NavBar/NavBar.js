import React, { useState, useContext } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "./../../context/StoreContext";
function NavBar({ setShowLogin }) {
  const navigate = useNavigate()
  const [menu, setMenu] = useState("home");
  const { getTotalAmount,token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <a
          href="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </a>
        <a
          href="#food-display"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt="search-icon"
          className="search-icon"
        />
        <div className="navbar-search">
          <Link to="/cart">
            <img
              src={assets.basket_icon}
              alt="basket_icon"
              className="basket_icon"
            />
          </Link>
          <div className={getTotalAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="nav-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="b" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="b" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
