import { useContext, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './comp/Home/Home.jsx'
import Signup from './comp/Signup/Signup.jsx'
import Login from './comp/Login/Login.jsx'
import Layout from './comp/Layout/Layout.jsx'
import Protector from './comp/Protectrouter/Protector.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import SunAndMoonProvider, { SunAndMoon } from './Context/SunAndMoon.jsx'
import Bulk from './comp/Bulk/Bulk.jsx'
import Shredded from './comp/Shredded/Shredded.jsx'
import Caloriecalc from './comp/Caloriecalc/Caloriecalc.jsx'
import UserProfile from './comp/UserProfile/UserProfile.jsx'
import CoachProfile from './comp/CoachProfile/CoachProfile.jsx'
import WorkoutList from './comp/WorkoutList/WorkoutList.jsx'
import Products from './comp/Products/Products.jsx'
import Exercises from './comp/Exercises/Exercises.jsx'
import { CartProvider } from "./Context/CartContext.jsx";
import UserProvider from './Context/Usercontext.jsx'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "signup", element: <Signup /> },
        { path: "caloriecalc", element: <Caloriecalc /> },
        { path: "bulk", element: <Bulk /> },
        { path: "shredded", element: <Shredded /> },
        { path: "login", element: <Login /> },
        { path: "userprofile", element: <UserProfile /> },
        { path: "coachprofile", element: <CoachProfile /> },
        { path: "workoutlist", element: <WorkoutList /> },
        { path: "products", element: <Products/> },
        { path: "exercises", element: <Exercises /> },
      ]
    }
  ])
  const queryClient = new QueryClient()

  return (
    <SunAndMoonProvider>
      <QueryClientProvider client={queryClient}>
         <CartProvider>
          <UserProvider>
      <RouterProvider router={router}>
      </RouterProvider>
          </UserProvider>
      </CartProvider>
      </QueryClientProvider>
    </SunAndMoonProvider>
  )
}

export default App
