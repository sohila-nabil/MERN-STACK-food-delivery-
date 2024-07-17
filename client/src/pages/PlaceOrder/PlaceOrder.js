import React, { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "./../../context/StoreContext";
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
function PlaceOrder() {
  const navigate = useNavigate()
  const { getTotalAmount, token, url, food_list, cartItems } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstname: "",
    lsatname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id]) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount()+2,
    };
    let res = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (res.data.success) {
      const { session_url } = res.data
      console.log(session_url);
      window.location.replace(session_url);
    } else {
      alert("Error")
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    }
    else if (getTotalAmount() === 0) {
       navigate("/cart");
    }
  }, [token, navigate]);
  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="first name"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="last name"
            name="lsatname"
            value={data.lsatname}
            onChange={handleChange}
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email Address"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="Street"
          name="street"
          value={data.street}
          onChange={handleChange}
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            value={data.state}
            onChange={handleChange}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="Zip code"
            name="zipcode"
            value={data.zipcode}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="Country"
            name="country"
            value={data.country}
            onChange={handleChange}
          />
        </div>
        <input
          required
          type="tel"
          placeholder="Phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery free</p>
              <p>{getTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Total</p>
              <p>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</p>
            </div>
            <hr />
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
