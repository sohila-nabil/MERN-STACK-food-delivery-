import React, { useContext } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((i, j) => {
          if (category === "All" || category === i.category) {
            return (
              <FoodItem
                key={j}
                id={i._id}
                name={i.name}
                description={i.description}
                image={i.image}
                price={i.price}
              />
            );
          }
        
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
