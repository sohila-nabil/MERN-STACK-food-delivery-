import React, { useContext, useEffect, useState } from "react";
import "./order.css";
import { StoreContext } from "./../../context/StoreContext";
import axios from "axios";
import { assets } from "./../../assets/assets";

function Orders() {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fecthOrders = async () => {
    const res = await axios.post(
      url + "/api/order/user-orders",
      {},
      { headers: { token } }
    );
    setData(res.data.orders);
    console.log(res.data.orders);
  };
  useEffect(() => {
    if (token) {
      fecthOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-order">
              <img src={assets.parcel_icon} alt="img" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>items:{order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.statues}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
