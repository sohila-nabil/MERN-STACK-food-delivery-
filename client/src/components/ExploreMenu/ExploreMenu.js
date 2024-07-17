import React from "react";
import "./exploreMenu.css";
import { menu_list } from "../../assets/assets";
function ExploreMenu({ category, setCategory }) {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-p">
        Choose from a diverse menu featuring delectable array of dishes crafted
        with the finest ingredients and culinary expertise, Our mission is to
        satisfy your cravings and elevate your dinig experience, one delicious
        meal at time
      </p>
      <div className="explore-menu-list">
        {menu_list.map((i, j) => {
          return (
            <div
              key={j}
              className="explore-menu-list-item"
              onClick={() =>
                setCategory((prev) =>
                  prev === i.menu_name ? "All" : i.menu_name
                )
              }
            >
              <img
                className={category === i.menu_name ? "active" : ""}
                src={i.menu_image}
                alt="menu-img"
              />
              <p>{i.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
