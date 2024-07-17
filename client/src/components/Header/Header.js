import React from "react";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your Favourite food here</h2>
        <p>
          Choose from a diverse menu featuring delectable array of dishes
          crafted with the finest ingredients and culinary expertise, Our
          mission is to satisfy your cravings and elevate your dinig experience,
          one delicious meal at time
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
