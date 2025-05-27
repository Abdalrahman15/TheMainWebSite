import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  async function getCart() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://localhost:7163/api/Cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(res?.data?.items || []);
    } catch (err) {
      console.log(err);
    }
  }

  async function addToCart(productId) {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://localhost:7163/api/Cart/Items",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getCart(); // لتحديث السلة بعد الإضافة
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFromCart(itemId) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:7163/api/Cart/Items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getCart(); // تحديث السلة بعد الحذف
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, getCart, addToCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
