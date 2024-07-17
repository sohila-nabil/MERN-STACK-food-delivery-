import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in
            leo ut turpis commodo ultrices. Nulla facilisi. Sed ut erat ut velit
            hendrerit facilisis. Suspendisse potenti. Integer et magna sit amet
            nunc vehicula sodales.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook_icon" />
            <img src={assets.twitter_icon} alt="twitter_icon" />
            <img src={assets.linkedin_icon} alt="linkedin_icon" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>011839202</li>
            <li>Contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024@ Tomato.com - All Right Reserved
      </p>
    </div>
  );
}

export default Footer;
