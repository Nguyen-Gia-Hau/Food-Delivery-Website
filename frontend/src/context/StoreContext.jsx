import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = `http://localhost:4000`

  const [token, setToken] = useState(localStorage.getItem("token") || "")

  const [cartItems, setCartItems] = useState({})

  const [food_list, setFoodList] = useState([])

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (let key in cartItems) {
      if (cartItems[key] > 0) {
        let itemInfo = food_list.find((product) => product._id == key)
        totalAmount += itemInfo.price * cartItems[key]
      }
    }
    return totalAmount
  }

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList()
    }
    loadData()
  }, [])

  const fetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list')
    setFoodList(response.data.data)
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;

