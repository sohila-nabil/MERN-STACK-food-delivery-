import React, { useContext } from "react";
import "./foodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
    const { cartItems, addToCart, removeFromCart, url } =
      useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={url + "/images/"+image} alt="img" />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            onClick={() => addToCart(id)}
            alt="plus"
            className="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="remove"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="stars" />
        </div>
        <p className="desc">{description}</p>
        <p className="price">{price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
