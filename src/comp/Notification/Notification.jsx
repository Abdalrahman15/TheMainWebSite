import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Notification() {

    async function getNotifications() {

        try{
            let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

            console.log(res)


        }catch(err){


            console.log(err)
        }
        
    }


    useEffect(() => {
      getNotifications()
    
      return () => {
        
      }
    }, [])
    



  return <>
  
  <div>Notification</div>
  </>
}
