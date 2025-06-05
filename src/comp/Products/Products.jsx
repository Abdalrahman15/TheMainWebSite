import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import { Link, useParams } from 'react-router-dom'


export default function Products() {

  const [Products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
  

  
  async function GetAllProducts() {
        setLoading(true);


    try{

      let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/products?limit=20",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      console.log(res.data.data.products,"ppppppppppppp")
      setProducts(res.data.data.products)



    }catch(err){


      console.log(err)
    }
    

    finally {
      setLoading(false);
    }
  }


  useEffect(() => {
     GetAllProducts()
    
  
    return () => {
      
    }
  }, [])



  async function DeleteProduct(id) {

    try{

      let res = await axios.delete(`https://fit-app-pink-omega.vercel.app/api/v1/products/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      console.log(res)
      GetAllProducts()

    }catch(err){

      console.log(err)

    }

      finally {
      setLoading(false);
    }
    
  }
  











  
  return <>

   <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 container mt-[120px] mb-[50px]">


         {loading && (
  <div className="fixed inset-0 bg-[#1f2937] bg-opacity-20 z-50 flex items-center justify-center">
    <div className="loadingHeart"></div>

  </div>
)}
    {
      Products?.map((P)=>{return<>

                    
      <div key={P.id} className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-[450px] ">
    
               <div className=' flex justify-center '> 
                {/* border-[8px] border-red-600  */}
                <img className="p-8 rounded-t-lg w-[250px] h-[200px] " src={P.image} alt="product" onError={(e) => { e.target.onerror = null; e.target.src = Dumble; }} />
              </div>
              <div className='w-full pb-1 mb-3 bg-red-600 '></div>
              <div className="px-5 ">
                <h1 className=' h4  my-3 text-red-700 font-bold font-serif'>Name: {P?.name}</h1>
                <h5 className="text-[13px]  tracking-tight text-gray-900 dark:text-white h-[70px] font-bold font-serif">
                  {P.description}
                </h5>
                <p className='text-red-700 font-bold font-serif'>Calories: {P?.calories}  <span className="text-[10px] text-blue-950">(per 100 gm)</span></p>
                <div className="flex gap-3 font-bold font-serif py-3">
                <p className='text-red-700 text-nowrap text-[13px]'>Carbs: {P?.macronutrients?.carbohydrates}<span className="text-[10px] text-blue-950">gm</span></p>
                <p className='text-red-700 flex text-nowrap text-[13px]'><span>Fats:</span> <span>{P?.macronutrients?.fats}</span><span className="text-[10px] text-blue-950 mt-[3px]">gm</span></p>
                <p className='text-red-700 flex text-nowrap text-[13px]'><span>Protein:</span> <span>{P?.macronutrients?.protein}</span><span className="text-[10px] text-blue-950 mt-[3px]">gm</span></p>

                </div>
              
             
                <p className='text-red-700 mt-1 font-bold font-serif'>Price: {P?.price} $</p>
                <div className="flex justify-between mt-1">

                
                  
                </div>
              </div>
            </div>
      
      
      
      </>
        
      })






    }
    </div>





    </>
  
}
