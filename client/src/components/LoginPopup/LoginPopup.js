import React, { useContext, useState } from "react";
import "./login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import  axios  from 'axios';
function LoginPopup({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign Up");
  const { url, setToken } = useContext(StoreContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUrl = url
    if (currState === "Login") {
      newUrl += "/api/user/login"
    }else {
      newUrl +="/api/user/register"
    }
    const res = await axios.post(newUrl, userData);
    if (res.data.success) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setShowLogin(false)
    } else {
      alert(res.data.msg)
    }

  };
  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="img"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your Name"
              required
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            required
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Your Password"
            required
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, i agree of terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
