import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { User, Calendar, Clock, Globe, Award, Settings } from 'lucide-react';

// Import user data
import userData from './jsonUser.jsx';

export default function UserProfile (){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might fetch this from an API
    // Here we're using the imported JSON directly
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
      <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg'>
        <h1 className="capitalize text-center">Personal Info</h1>
        <div className="flex  mb-4">
          <img 
            src={user.profileImageUrl} 
            alt="      IT IS  
                     YOUR PROFILE
                     IMG "
             
            className="w-[120px] h-[120px] rounded-full text-wrap bg-black bg-opacity-10 text-center flex justify-center items-center "  
          />
        </div>
        <p>Name : {user.name}</p>
        <p>Email : {user.email}</p>
        <p>Birth Date : {formatDate(user.birthDate)}</p>
        <p>Height : {user.height}</p>
        <p>Weight : {user.weight}</p>
      </div>

      <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg'>
        <h1 className="capitalize text-center">Account Details</h1>
        <p>Status : {user.status}</p>
        <p className='text-nowrap d-inline'>Premium : {user.isPremium ? <span>Active</span> : <span>No Premium</span>}</p>
        <p>Premium Expires : {formatDate(user.premiumExpiry)}</p>
      </div>

      <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg'>
        <h1 className="capitalize text-center">Preferences</h1>
        <p>Status : {user.status}</p>
        <p>Language : {user.preferredLanguage}</p>
        <p>Time Zone : {user.timezone}</p>
        <p>{user.preferences[0].key} : {user.preferences[0].value}</p>
        <p>{user.preferences[1].key} : {user.preferences[1].value}</p>
      </div>

      <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg'>
        <h1 className="capitalize text-center">Connections</h1>
        <p>Total Connections : {user.connections[0].id}</p>
        <p>User Id : {user.connections[0].connectedUserId}</p>
        <p>Connection Type : {user.connections[0].connectionType}</p>
      </div>

      <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg'>
        <h1 className="capitalize text-center">Coach Details</h1>
        <p>Coach Id : {user.coach.id}</p>
        <p>Specialization : {user.coach.specialization}</p>
        <p>Certifications : {user.coach.certifications[0]}, {user.coach.certifications[1]}</p>
      </div>
    </div>

    <div className='w-[50%] mx-auto text-center mb-11'>
      Last Login : {formatDate(user.lastLoginDate)} 
    </div>
  </>;
};

