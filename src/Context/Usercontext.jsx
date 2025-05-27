import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [GetToken, setGetToken] = useState(null)

 useEffect(() => {
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    try {
      const decoded = jwtDecode(storedToken);
      console.log("📦 Token (direct):", storedToken);
      console.log("👤 Decoded User Data (direct):", decoded);

      setToken(storedToken);
      setUserData(decoded);
    } catch (error) {
      console.error("فشل في فك التوكن:", error);
    }
  }
}, []);


  useEffect(() => {
  if (token) {
    console.log("📦 Token:", token);
  }
}, [token]);

useEffect(() => {
  if (userData) {
    console.log("👤 Decoded User Data:", userData);
  }
}, [userData]);





  

  return (
    <UserContext.Provider value={{ token, setToken, userData ,setGetToken,GetToken }}>
      {children}
    </UserContext.Provider>
  );
}
