import React, { useState, useEffect } from "react";
import "./orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets";
function Orders() {
  const url = "http://localhost:4000";
  const [orders, setOrders] = useState([]);
  const fetchAllorders = async () => {
    const res = await axios.get(url + "/api/order/all-orders");
    if (res.data.success) {
      setOrders(res.data.orders);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (e, orderId) => {
    const res = await axios.post(url + "/api/order/status", {
      orderId,
      statues:e.target.value
    });
    if (res.data.success) {
      toast.success(res.data.msg);
      await fetchAllorders()
    }
  }

  useEffect(() => {
    fetchAllorders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="img" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstname + " " + order.address.lsatname}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(e) => {
                statusHandler(e, order._id);
              }}
              value={order.statues}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
