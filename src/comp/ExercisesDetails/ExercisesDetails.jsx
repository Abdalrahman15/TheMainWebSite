import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'



export default function ExercisesDetails() {
       let {name} = useParams()
       const [Specific, setSpecific] = useState(null)
       console.log(Specific)
    const [toggle, setToggle] = useState(true)
       



    async function getExercisesDetails(name) {
        try{

            let res = await axios.get(`https://fit-app-pink-omega.vercel.app/api/v1/exercises/${name}`,
                {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
            )
            console.log(res)

            setSpecific(res?.data?.data?.exercise)


        }catch(err){
            console.log(err)
        }
    }







    useEffect(() => {
        getExercisesDetails(name)
      
    
      return () => {
        
      }
    }, [])
    















return<>

<div key={Specific?._id} className="w-[80%] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 container p-10 mt-[150px] mb-[50px]">              <div className=' flex justify-center'>
                <img className="p-8 rounded-t-lg w-[400px] h-[290px]" src={Specific?.image} alt="exercise" onError={(e) => { e.target.onerror = null; e.target.src = Dumble; }} />
              </div>
              <div className='py-1 my-3 bg-red-600 w-full'></div>
              <div className="px-5 pb-3 my-1">
                <h1 className=' h1 text-3xl font-serif font-medium text-red-700 my-1'>{Specific?.name}</h1>
                <h5 className="text font-semibold tracking-tight text-gray-900 dark:text-white text-xl my-1">
                  {Specific?.description}
                </h5>
                <p className="text-yellow-700 font-bold my-1">Level: {Specific?.level}</p>
                <p className='text-red-700 font-serif my-1'>MuscleGroup: {Specific?.primaryMuscleGroup}</p>
              </div>
              <div className='flex justify-end'>

              <button className=' bg-black p-2 rounded-lg font-serif text-white' onClick={() => setToggle(!toggle)}>See more tips on how to play?</button>
              </div>
            </div>


            <div className={`my-[50px] container  flex-col justify-between gap-5 ${toggle==true? "hidden":" "}`}>
               {
                Specific?.instructions.map((S)=>{return <>

                <div className=' flex gap-5 mx-auto  w-[70%] my-3 '>
                <span>{S.title}:</span>  <span>{S.description}</span> 

                </div>

                
                
                
                
                
                
                </>})
                




               }
            </div>














</>
}