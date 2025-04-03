
const workoutData = {
    workoutId: 1,
    name: "Upper Body Strength",
    scheduledDate: "2025-04-04T10:00:00",
    duration: 60,
    type: "Strength",
    isCompleted: false,
    notes: "Focus on form and controlled movements",
    location: "Home Gym",
    exercises: [
      {
        workoutExerciseId: 1,
        exerciseId: 101,
        exercise: {
          name: "Bench Press",
          category: "Strength",
          equipment: "Barbell",
          targetMuscles: ["Chest", "Triceps", "Shoulders"],
          difficulty: "Intermediate"
        },
        targetSets: 4,
        targetReps: 8,
        targetWeight: 135,
        sortOrder: 1,
        notes: "Keep elbows at 45° angle",
        sets: [
          { setId: 1001, setType: "Warmup", reps: 10, weight: 95, isCompleted: true },
          { setId: 1002, setType: "Standard", reps: 8, weight: 135, isCompleted: false },
          { setId: 1003, setType: "Standard", reps: 8, weight: 135, isCompleted: false },
          { setId: 1004, setType: "Standard", reps: 8, weight: 135, isCompleted: false }
        ]
      },
      {
        workoutExerciseId: 2,
        exerciseId: 102,
        exercise: {
          name: "Pull Ups",
          category: "Strength",
          equipment: "Body Weight",
          targetMuscles: ["Back", "Biceps", "Shoulders"],
          difficulty: "Intermediate"
        },
        targetSets: 3,
        targetReps: 10,
        sortOrder: 2,
        notes: "Full range of motion",
        sets: [
          { setId: 2001, setType: "Standard", reps: 10, isCompleted: false },
          { setId: 2002, setType: "Standard", reps: 10, isCompleted: false },
          { setId: 2003, setType: "Standard", reps: 10, isCompleted: false }
        ]
      },
      {
        workoutExerciseId: 3,
        exerciseId: 103,
        exercise: {
          name: "Shoulder Press",
          category: "Strength",
          equipment: "Dumbbell",
          targetMuscles: ["Shoulders", "Triceps"],
          difficulty: "Intermediate"
        },
        targetSets: 3,
        targetReps: 12,
        targetWeight: 30,
        sortOrder: 3,
        notes: "",
        sets: [
          { setId: 3001, setType: "Standard", reps: 12, weight: 30, isCompleted: false },
          { setId: 3002, setType: "Standard", reps: 12, weight: 30, isCompleted: false },
          { setId: 3003, setType: "Standard", reps: 12, weight: 30, isCompleted: false }
        ]
      },
      {
        workoutExerciseId: 4,
        exerciseId: 104,
        exercise: {
          name: "Bicep Curls",
          category: "Isolation",
          equipment: "Dumbbell",
          targetMuscles: ["Biceps"],
          difficulty: "Beginner"
        },
        targetSets: 3,
        targetReps: 15,
        targetWeight: 20,
        sortOrder: 4,
        notes: "Controlled movement, no swinging",
        sets: [
          { setId: 4001, setType: "Standard", reps: 15, weight: 20, isCompleted: false },
          { setId: 4002, setType: "Standard", reps: 15, weight: 20, isCompleted: false },
          { setId: 4003, setType: "Standard", reps: 15, weight: 20, isCompleted: false }
        ]
      }
    ]
  };

  export default workoutData;