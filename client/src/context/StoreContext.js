import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setfood_list] = useState([]);

  const [token, setToken] = useState("");

  const url = "http://localhost:4000";
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add-to-cart",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove-cart",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((i) => i._id === item);
        total += itemInfo.price * cartItems[item];
      }
    }
    return total;
  };

  const fetchFoodList = async () => {
    const res = await axios.get(url + "/api/food/foodList");
    setfood_list(res.data.data);
  };
  
  const fetchCartData = async (token) => {
    const res = await axios.post(url + "/api/cart/get-cart", {}, { headers: { token } });
    setCartItems(res.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await fetchCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const contextValue = {
    food_list,
    cartItems,
    url,
    token,
    setfood_list,
    setToken,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    fetchFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
