import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = `http://localhost:4000`

  const [token, setToken] = useState(localStorage.getItem("token") || "")

  const [cartItems, setCartItems] = useState({})

  const [food_list, setFoodList] = useState([])

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if (token) {
      await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } })
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token)
      await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } })
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

  useEffect(() => {
    async function loadData() {
      await fetchFoodList()
      await fetchCartList()
    }
    loadData()
  }, [])

  const fetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list')
    setFoodList(response.data.data)
  }

  const fetchCartList = async () => {
    if (token) {
      const response = await axios.get(url + '/api/cart/get', { headers: { token } })
      setCartItems(response.data.cartData)
    }
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
    setToken,
    fetchCartList
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;

