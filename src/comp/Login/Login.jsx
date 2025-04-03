import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SunAndMoon } from '../../Context/SunAndMoon.jsx'




export default function Login() {
    const [sucess, setSucess] = useState(null)
    const [faild, setFaild] = useState(null)
    const [token, setToken] = useState(null)
    const [toggle, setToggle] = useState(false)
    const { togglex } = useContext(SunAndMoon)
    const [goal, setGoal] = useState(null)
    let nav = useNavigate()


      
  
    




  
   
  
    


    async function handleLogin(values) {
        try {
            let res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            console.log(res)

            setSucess(res?.data?.message)
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token)
            if(goal==="Bulk"){
                nav("/bulk")
            }if(goal==="Shredded"){
                nav("/shredded")
            }

            
            setFaild(" ")

        } catch (err) {
            console.log(err)
            setFaild(err.response.data.message)
            setSucess(" ")
        }
    }

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: handleLogin
    })

    return <>
        <form className="max-w-sm mx-auto mt-[100px]" onSubmit={formik.handleSubmit}>
            <div className="mb-5">
                <label htmlFor="email" className={`block mb-2 text-sm font-medium ${togglex == false ? "text-white" : "text-gray-950"}`}>Your email</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
            </div>

            <div className="mb-5 relative">
                <label htmlFor="password" className={`block mb-2 text-sm font-medium ${togglex == false ? "text-white" : "text-gray-950"}`}>
                    Your password
                </label>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    type={toggle ? "text" : "password"}
                    id="password"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${togglex == false ? "text-gray-950" : "text-red-800"}`}
                    placeholder=""
                    required
                />
                <i
                    onClick={() => setToggle(!toggle)}
                    className={`absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer mt-3 ${toggle ? "text-yellow-600 fa-solid fa-eye" : "fa-solid fa-eye-slash"}`}
                ></i>
            </div>
            <div>
                <label htmlFor="Test"></label>
                <select name="Test" id="Test" className='p-1 rounded-r-sm'
                onChange={(e)=>setGoal(e.target.value)}
                >
                <option value="">Select Your Goal</option>
                <option value="Bulk">Bulk</option>
                <option value="Shredded">Shredded</option>
                </select>
            </div>




           
          




            <button type="submit" className="mt-5 text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            <h1>{sucess}</h1>
            <h1>{faild}</h1>
        </form>


    </>
}
