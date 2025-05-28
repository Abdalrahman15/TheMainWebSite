import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
  "Calculate your daily calorie needs based on your goal and body weight ",
  "Aim for 8-12 reps per set for muscle hypertrophy",
  "Choose weights that make you reach muscle failure by the last rep",
  "Split your workouts to target different muscle groups throughout the week",
  "Always warm up and stretch before and after training",
  "Focus on compound exercises like squats, deadlifts, and bench press",
  "Rest 60 to 90 seconds between sets for hypertrophy training",
  "Consume 1.6 to 2.2 grams of protein per kilogram of body weight daily",
  "Distribute protein intake evenly across your meals",
  "Include healthy fats like olive oil, nuts, and avocados in your diet",
  "Eat carbohydrates before and after workouts to boost energy and recovery",
  "Stay hydrated by drinking 3 to 4 liters of water per day",
  "Have a post-workout meal with protein and carbs to enhance recovery",
  "Limit processed sugars and junk food for optimal results",
  "Increase your calorie intake by 10-20% if your goal is muscle gain",
  "Prioritize consistent training and quality sleep for better muscle growth",
  "Progressively overload by increasing weights or reps over time",
  "Track your progress regularly to adjust your plan accordingly",
  "Don’t skip leg day—strong legs support overall strength",
  "Incorporate rest days to allow muscles to repair and grow",
  "Balance cardio sessions with strength training to improve endurance",
  "Use proper form to avoid injuries and maximize effectiveness",
  "Include protein-rich snacks between meals to meet daily targets",
  "Limit alcohol consumption as it impairs muscle recovery",
  "Prepare meals ahead to maintain nutritional consistency",
];


export default function Footer() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='w-full'>
      
      {/* الجزء العلوي - نصوص متحركة */}
      <div className='bg-gray-800 text-white p-5 text-center'>
        <h1 className='text-3xl lg:text-3xl font-serif flex justify-center   '>
          <TextTransition springConfig={presets.wobbly}>
            <span className='text-red-600'> <span className='text-white'>Today's tip : </span>  ❤</span> ' {TEXTS[index]} ' <span className='text-red-600'>❤</span>
          </TextTransition>
        </h1>
      </div>

      {/* الجزء السفلي - كلمة footer */}
      <div className='bg-black text-white py-[100px] text-center'>
        <p className='text-lg'></p>
        <span className="px-6 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-yellow-100">
  <a href="https://www.facebook.com/?locale=ar_AR" target="_blank" rel="noreferrer">
    <i className="fa-brands fa-facebook text-2xl cursor-pointer hover:text-yellow-600"></i>
  </a>
</span>

<span className="px-6 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-yellow-100">
  <a href="https://x.com/" target="_blank" rel="noreferrer">
    <i className="fa-brands fa-square-x-twitter text-2xl cursor-pointer hover:text-yellow-600"></i>
  </a>
</span>

<span className="px-6 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-yellow-100">
  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
    <i className="fa-brands fa-square-instagram text-2xl cursor-pointer hover:text-yellow-600"></i>
  </a>
</span>

<span className="px-6 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-yellow-100">
  <a href="https://discord.com/" target="_blank" rel="noreferrer">
    <i className="fa-brands fa-discord text-2xl cursor-pointer hover:text-yellow-600"></i>
  </a>
</span>

      </div>
    </div>
  );
}
