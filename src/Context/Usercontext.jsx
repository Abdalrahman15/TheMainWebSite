import React, { createContext, useState } from 'react'




let  Usercontext = createContext()

export default function Usercontext({children}) {

    const [Token, settoken] = useState(second)

    settoken(localStorage.getItem("token"))




  return <>
  <Usercontext.provider value={{Token,settoken}}>

    {children}
  </Usercontext.provider>
  
  
  </>
}
