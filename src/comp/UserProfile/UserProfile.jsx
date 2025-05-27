import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { User, Calendar, Clock, Globe, Award, Settings } from 'lucide-react';
import {jwtDecode} from 'jwt-decode';
import { useFormik } from 'formik';
import axios from 'axios';

// Import user data
import userData from './jsonUser.jsx';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [decodedToken, setdecodedToken] = useState("");
  const [Userprofile, setUserprofile] = useState("");
    const [toggle, setToggle] = useState(true)
  
  console.log(Userprofile, "xyzu");

  async function getProfile() {
    try {
      let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUserprofile(res.data.data.profile);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProfile();
    return () => {};
  }, []);

  async function editProfile(values) {
    try {
      let res = await axios.patch("https://fit-app-pink-omega.vercel.app/api/v1/users/update-profile", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(res);
      getProfile();
    } catch (err) {
      console.log(err);
    }
  }

  // --- دالة رفع الصورة مع استدعاء الـ endpoint الخاص بالصورة فقط ---
  async function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axios.patch("https://fit-app-pink-omega.vercel.app/api/v1/users/avatar", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // content-type: multipart/form-data يضبطه axios تلقائياً
        },
      });
      alert("Avatar updated successfully!");
      getProfile(); // تحديث البروفايل بعد تغيير الصورة
    } catch (error) {
      console.error(error);
      alert("Failed to update avatar.");
    }
  }

  let formik = useFormik({
    initialValues: {
      gender: "",
      age: "",
      height: "",
      weight: "",
      fitnessGoal: " ",
      activityLevel: ""
    },
    onSubmit: editProfile
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const rawToken = storedToken.startsWith("Bearer ") ? storedToken.split(" ")[1] : storedToken;
      setToken(rawToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setdecodedToken(decoded);
        console.log("Decoded JWT:", decoded);
      } catch (err) {
        console.error("Invalid token:", err.message);
      }
    }
  }, [token]);

  useEffect(() => {
    setUser(userData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading user data...</div>;
  }

  if (!user) {
    return <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>User not found</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const daysSincePremiumRenewal = () => {
    const today = new Date();
    const premiumDate = new Date(user.premiumExpiry);
    const diffTime = Math.abs(premiumDate - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return <>
    <div className='mt-[100px] mb-[30px]'>
      <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg '>
        <h1 className="capitalize text-center">Personal Info</h1>
        <div className="flex mb-4 flex items-center gap-4">
          <img
            src={Userprofile.avatar}
            alt="YOUR PROFILE IMG"
            className="w-[120px] h-[120px] rounded-full bg-black bg-opacity-10"
          />

          {/* زر اختيار صورة جديدة */}
          <div>
            <label
              htmlFor="avatarUpload"
              className="cursor-pointer px-4 py-2 bg-black text-white rounded hover:bg-yellow-600"
            >
              edit
            </label>
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <p>Name : {Userprofile.username}</p>
        <p>Email : {Userprofile.email}</p>
        <p>Height : {Userprofile.height}</p>
        <p>Weight : {Userprofile.weight}</p>
        <p>Gender : {Userprofile.gender}</p>
        <p>FitnessGoal : {Userprofile.fitnessGoal}</p>
        <p>age : {Userprofile.age}</p>
        <p>ActivityLevel : {Userprofile.activityLevel}</p>
        <div className='flex justify-end'>
          <button className='btn-danger px-7 py-3 bg-black rounded-lg mt-3 flex justify-end text-white hover:bg-yellow-600' onClick={()=>{return setToggle(!toggle)}}>Edit my profile</button>
        </div>
      </div>

      <form className={` ms-auto mt-[50px] mb-10 container bg-gray-100 p-5 rounded-sm shadow-md ${toggle==true? "hidden":" "}`} onSubmit={formik.handleSubmit}>
        <h2 className='py-6 mb-7 text-center'>Edit Profile</h2>

        {/* Gender Dropdown */}
        <div className="mb-5">
          <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
          <select
            id="gender"
            name="gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Age */}
        <div className="mb-5">
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Age</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            type="number"
            id="age"
            name="age"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Height */}
        <div className="mb-5">
          <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900">Height (cm)</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.height}
            type="number"
            id="height"
            name="height"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Weight */}
        <div className="mb-5">
          <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900">Weight (kg)</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
            type="number"
            id="weight"
            name="weight"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Fitness Goal Dropdown */}
        <div className="mb-5">
          <label htmlFor="fitnessGoal" className="block mb-2 text-sm font-medium text-gray-900">Fitness Goal</label>
          <select
            id="fitnessGoal"
            name="fitnessGoal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fitnessGoal}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Select goal</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Gain Weight">Gain Weight</option>
            <option value="Get Fitter">Get Fitter</option>
            <option value="Gain More Flexible">Gain More Flexible</option>
            <option value="Learn The Basic">Learn The Basic</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Endurance Training">Endurance Training</option>
            <option value="General Fitness">General Fitness</option>
          </select>
        </div>

        {/* Activity Level Dropdown */}
        <div className="mb-5">
          <label htmlFor="activityLevel" className="block mb-2 text-sm font-medium text-gray-900">Activity Level</label>
          <select
            id="activityLevel"
            name="activityLevel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.activityLevel}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>

    <div className='w-[50%] mx-auto text-center mb-11'>
      Last Login : {formatDate(Userprofile.updatedAt)}
    </div>
  </>;
}
