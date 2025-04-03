import workoutData from "./jsonWorkoutList.jsx";
import React, { useEffect, useState } from "react";

export default function WorkoutList() {
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toggleMenu, setToggleMenu] = useState({});
    
    useEffect(() => {
        setWorkout({ ...workoutData, exercises: workoutData.exercises.map(E => ({
            ...E,
            sets: E.sets.map(S => ({ ...S, isCompleted: false }))
        }))});
        setLoading(false);
    }, []);

    const toggleExerciseMenu = (index) => {
        setToggleMenu((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const toggleCheck = (exerciseIndex, setIndex) => {
        setWorkout(prevWorkout => {
            const newWorkout = { ...prevWorkout };
            newWorkout.exercises[exerciseIndex].sets[setIndex].isCompleted = 
                !newWorkout.exercises[exerciseIndex].sets[setIndex].isCompleted;
            return { ...newWorkout };
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    if (loading || !workout) return <p>Loading...</p>;

    return <>
        <div className="mt-[100px]">
            <div className="bg-gray-200 w-[90%] mx-auto">
                <h1 className="p-5 py-1">{workout.name}</h1>
                <p className="ps-5 py-1 capitalize">date: {formatDate(workout.scheduledDate)}</p>
                <p className="ps-5 py-1 capitalize">duration: {workout.duration} <span>minutes</span></p>
                <p className="ps-5 py-1 capitalize">location: {workout.location}</p>
                <p className="ps-5 py-1 capitalize">type: {workout.type}</p>
                <div>
                    <p className="ps-5 py-1 capitalize">notes: {workout.notes}</p>
                </div>
            </div>

            <div className="bg-gray-200 w-[90%] mx-auto mt-[30px]">
                <h1 className="p-5">Exercises</h1>
                <div>
                    {workout.exercises.map((E, exerciseIndex) => (
                        <div key={exerciseIndex} className="p-5 bg-red-700 my-3">
                            <h1 className="p-5">{E.exercise.name}</h1>
                            <div className="flex gap-5">
                                <div className="bg-zinc-400 rounded-lg p-1">
                                    {E.targetSets} <span>sets</span> x {E.targetReps} <span>reps</span>
                                </div>
                                <div className="bg-zinc-400 rounded-lg p-1">
                                    {E.targetWeight} <span>lbs</span>
                                </div>
                                <div className="bg-zinc-400 rounded-lg p-1">{E.exercise.equipment}</div>
                            </div>

                            <div className="flex">
                                <i 
                                    className="fa-solid fa-caret-down bg-yellow-700 ms-auto p-3 text-xl cursor-pointer my-3"
                                    onClick={() => toggleExerciseMenu(exerciseIndex)}
                                ></i>
                            </div>

                            <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${toggleMenu[exerciseIndex] ? "" : "hidden"}`}>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">sets</th>
                                            <th scope="col" className="px-6 py-3">type</th>
                                            <th scope="col" className="px-6 py-3">reps</th>
                                            <th scope="col" className="px-6 py-3">Weight</th>
                                            <th scope="col" className="px-6 py-3">Status</th>
                                            <th scope="col" className="px-6 py-3">action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {E.sets.map((S, setIndex) => (
                                            <tr key={setIndex} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {setIndex + 1}
                                                </th>
                                                <td className="px-6 py-4">{S.setType}</td>
                                                <td className="px-6 py-4">{S.reps}</td>
                                                <td className="px-6 py-4">{S.weight}lbs</td>
                                                <td className={`px-6 py-4 font-bold ${S.isCompleted ? "text-green-500" : "text-red-500"}`}>
                                                    {S.isCompleted ? "complete" : "pending"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <i 
                                                        className={`fa-solid fa-check cursor-pointer ${
                                                            S.isCompleted ? "text-green-500" : ""
                                                        }`} 
                                                        onClick={() => toggleCheck(exerciseIndex, setIndex)}
                                                    ></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>;
}
