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
import Products from './comp/Products/Products.jsx'
import Exercises from './comp/Exercises/Exercises.jsx'
import { CartProvider } from "./Context/CartContext.jsx";
import { NotificationProvider } from "./Context/NotificationsContext.jsx";
import UserProvider from './Context/Usercontext.jsx'
import ExercisesDetails from './comp/ExercisesDetails/ExercisesDetails.jsx'
import WorkoutList from './comp/WorkoutList/WorkoutList.jsx'
import CreatWorkout from './comp/CreatWorkout/CreatWorkout.jsx'
import SeeCoaches from './comp/SeeCoaches/SeeCoaches.jsx'
import  PreviousOrders from './comp/PreviousOrders/PreviousOrders.jsx'
import MySubscriptions from './comp/MySubscriptions/MySubscriptions.jsx'
import Notification from './comp/Notification/Notification.jsx'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SubsToCoach from './comp/SubsToCoach/SubsToCoach.jsx'
import About from './comp/About/About.jsx'

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
        { path: "products", element: <Products/> },
        { path: "exercises", element: <Exercises /> },
        { path: "exercisesdetails/:name", element: <ExercisesDetails /> },
        { path: "substocoach/:id", element: <SubsToCoach /> },
        { path: "workoutlist", element: <WorkoutList/> },
        { path: "Creatworkout", element: <CreatWorkout/> },
        { path: "previousorders", element: <PreviousOrders/> },
        { path: "mysubs", element: <MySubscriptions/> },
        { path: "seecoaches", element: <SeeCoaches/> },
        { path: "notification", element: <Notification/> },
        { path: "about", element: <About/> },
        { path: "userprofile/personalinfo", element: <CreatWorkout/> },
        { path: "userprofile/accountinfo", element: <CreatWorkout/> },
      ]
    }
  ])
  const queryClient = new QueryClient()

  return (
    <SunAndMoonProvider>
      <QueryClientProvider client={queryClient}>
         <CartProvider>
          <UserProvider>
            <NotificationProvider>
      <RouterProvider router={router}>
      </RouterProvider>
      <ToastContainer />
            </NotificationProvider>
          </UserProvider>
      </CartProvider>
      </QueryClientProvider>
    </SunAndMoonProvider>
  )
}

export default App
