import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X, ChevronRight, Plus, CheckCircle, Info } from 'lucide-react';

const ExercisePage = () => {
  // State for exercises and filters
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    categories: [],
    equipment: [],
    difficulty: '',
    muscleGroups: []
  });

  // Available filter options (would come from API in real app)
  const categories = ['Strength', 'Cardio', 'Flexibility', 'Balance', 'Plyometric'];
  const equipmentOptions = ['Barbell', 'Dumbbell', 'Kettlebell', 'Machine', 'Bodyweight', 'Resistance Band', 'Cable'];
  const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];
  const muscleGroupOptions = ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Full Body'];

  // Fetch exercises from API (simulated)
  useEffect(() => {
    const fetchExercises = async () => {
      // In a real app, this would be an API call
      // Simulating API response based on database schema
      const mockExercises = [
        {
          exerciseId: 1,
          name: 'Squat',
          description: 'A compound lower body exercise that targets multiple muscle groups.',
          category: 'Strength',
          equipment: 'Barbell',
          difficulty: 'Beginner',
          instructions: 'Stand with feet shoulder-width apart, lower your body by bending your knees and pushing your hips back as if sitting in a chair. Keep your chest up and back straight. Lower until thighs are parallel with the ground, then push through your heels to return to standing.',
          isVerified: true,
          targetMuscles: [
            { muscleGroup: 'Legs', isPrimary: true },
            { muscleGroup: 'Core', isPrimary: false }
          ],
          media: [
            { mediaId: 1, mediaType: 'image', url: '/api/placeholder/400/300' }
          ]
        },
        {
          exerciseId: 2,
          name: 'Bench Press',
          description: 'A compound upper body exercise that primarily targets the chest muscles.',
          category: 'Strength',
          equipment: 'Barbell',
          difficulty: 'Beginner',
          instructions: 'Lie on a bench with feet on the ground. Grip the barbell with hands slightly wider than shoulder-width. Lower the bar to your chest, then press it back up to the starting position, extending your arms without locking your elbows.',
          isVerified: true,
          targetMuscles: [
            { muscleGroup: 'Chest', isPrimary: true },
            { muscleGroup: 'Arms', isPrimary: false },
            { muscleGroup: 'Shoulders', isPrimary: false }
          ],
          media: [
            { mediaId: 2, mediaType: 'image', url: '/api/placeholder/400/300' }
          ]
        },
        {
          exerciseId: 3,
          name: 'Deadlift',
          description: 'A compound full body exercise that primarily targets the posterior chain.',
          category: 'Strength',
          equipment: 'Barbell',
          difficulty: 'Intermediate',
          instructions: 'Stand with feet hip-width apart, with the barbell over your mid-foot. Bend at the hips and knees to grip the bar. Keep your back straight, chest up, and core tight. Lift the bar by driving through your heels and extending your hips and knees. Return the weight to the ground with control.',
          isVerified: true,
          targetMuscles: [
            { muscleGroup: 'Back', isPrimary: true },
            { muscleGroup: 'Legs', isPrimary: true },
            { muscleGroup: 'Core', isPrimary: false },
            { muscleGroup: 'Arms', isPrimary: false }
          ],
          media: [
            { mediaId: 3, mediaType: 'image', url: '/api/placeholder/400/300' }
          ]
        },
        {
          exerciseId: 4,
          name: 'Push-Up',
          description: 'A bodyweight exercise that targets the upper body.',
          category: 'Strength',
          equipment: 'Bodyweight',
          difficulty: 'Beginner',
          instructions: 'Start in a plank position with hands slightly wider than shoulder-width. Lower your body by bending your elbows until your chest nearly touches the floor. Keep your body in a straight line from head to heels. Push yourself back up to the starting position by extending your arms.',
          isVerified: true,
          targetMuscles: [
            { muscleGroup: 'Chest', isPrimary: true },
            { muscleGroup: 'Arms', isPrimary: false },
            { muscleGroup: 'Shoulders', isPrimary: false },
            { muscleGroup: 'Core', isPrimary: false }
          ],
          media: [
            { mediaId: 4, mediaType: 'image', url: '/api/placeholder/400/300' }
          ]
        },
        {
          exerciseId: 5,
          name: 'Pull-Up',
          description: 'A bodyweight exercise that targets the upper body pulling muscles.',
          category: 'Strength',
          equipment: 'Bodyweight',
          difficulty: 'Intermediate',
          instructions: 'Hang from a pull-up bar with palms facing away and hands slightly wider than shoulder-width. Pull your body up until your chin is over the bar. Lower yourself with control back to the hanging position.',
          isVerified: true,
          targetMuscles: [
            { muscleGroup: 'Back', isPrimary: true },
            { muscleGroup: 'Arms', isPrimary: false },
            { muscleGroup: 'Shoulders', isPrimary: false }
          ],
          media: [
            { mediaId: 5, mediaType: 'image', url: '/api/placeholder/400/300' }
          ]
        },
        {
          exerciseId: 6,
          name: 'Lunges',
          description: 'A unilateral lower body exercise.',
          category: 'Strength',
          equipment: 'Bodyweight',
          difficulty: 'Beginner',
          instructions: 'Stand with feet hip-width apart. Take a step forward with one leg and lower your body until both knees are bent at 90-degree angles. Push through the front heel to return to the starting position. Repeat with the other leg.',
          isVerified: true,
          targetMuscles: [
            { muscleGroup: 'Legs', isPrimary: true },
            { muscleGroup: 'Core', isPrimary: false }
          ],
          media: [
            { mediaId: 6, mediaType: 'image', url: '/api/placeholder/400/300' }
          ]
        },
        {
          exerciseId: 7,
          name: 'Plank',
          description: 'An isometric core exercise.',
          category: 'Strength',
          equipment: 'Bodyweight',
          difficulty: 'Beginner',
          instructions: 'Start in a push-up position, then lower onto your forearms. Keep your body in a straight line from head to heels. Engage your core, squeeze your glutes, and hold the position.',
          isVerified: true,
          targetMuscles: [
            { muscleGroup: 'Core', isPrimary: true },
            { muscleGroup: 'Shoulders', isPrimary: false }
          ],
          media: [
            { mediaId: 7, mediaType: 'image', url: '/api/placeholder/400/300' }
          ]
        },
        {
          exerciseId: 8,
          name: 'Shoulder Press',
          description: 'A compound upper body exercise that targets the shoulders.',
          category: 'Strength',
          equipment: 'Dumbbell',
          difficulty: 'Intermediate',
          instructions: 'Sit or stand with a dumbbell in each hand at shoulder height. Press the weights overhead until your arms are fully extended. Lower the weights back to shoulder height with control.',
          isVerified: true,
          targetMuscles: [
            { muscleGroup: 'Shoulders', isPrimary: true },
            { muscleGroup: 'Arms', isPrimary: false }
          ],
          media: [
            { mediaId: 8, mediaType: 'image', url: '/api/placeholder/400/300' }
          ]
        }
      ];
      
      setExercises(mockExercises);
      setFilteredExercises(mockExercises);
      setLoading(false);
    };

    fetchExercises();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...exercises];
    
    // Apply search term
    if (searchTerm) {
      result = result.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(exercise => 
        filters.categories.includes(exercise.category)
      );
    }
    
    // Apply equipment filter
    if (filters.equipment.length > 0) {
      result = result.filter(exercise => 
        filters.equipment.includes(exercise.equipment)
      );
    }
    
    // Apply difficulty filter
    if (filters.difficulty) {
      result = result.filter(exercise => 
        exercise.difficulty === filters.difficulty
      );
    }
    
    // Apply muscle group filter
    if (filters.muscleGroups.length > 0) {
      result = result.filter(exercise => 
        exercise.targetMuscles.some(tm => 
          filters.muscleGroups.includes(tm.muscleGroup)
        )
      );
    }
    
    setFilteredExercises(result);
  }, [exercises, searchTerm, filters]);

  // Toggle filter selections
  const toggleCategory = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleEquipment = (equipment) => {
    setFilters(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment]
    }));
  };

  const toggleMuscleGroup = (muscleGroup) => {
    setFilters(prev => ({
      ...prev,
      muscleGroups: prev.muscleGroups.includes(muscleGroup)
        ? prev.muscleGroups.filter(m => m !== muscleGroup)
        : [...prev.muscleGroups, muscleGroup]
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      equipment: [],
      difficulty: '',
      muscleGroups: []
    });
    setSearchTerm('');
  };

  // Add exercise to workout (would send API request in real app)
  const addToWorkout = (exerciseId) => {
    alert(`Exercise ID ${exerciseId} added to workout!`);
    // In a real app, this would open a modal to select the workout or add to current workout
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading exercises...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50  mt-[100px]">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Exercise Library</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Welcome, User</span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar with filters */}
          <aside className="w-full md:w-1/4 bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                {showFilters ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              {(filters.categories.length > 0 || filters.equipment.length > 0 || 
                filters.difficulty || filters.muscleGroups.length > 0) && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear
                </button>
              )}
            </div>
            
            <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Category</h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Equipment Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Equipment</h3>
                <div className="space-y-1">
                  {equipmentOptions.map(equipment => (
                    <div key={equipment} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`equipment-${equipment}`}
                        checked={filters.equipment.includes(equipment)}
                        onChange={() => toggleEquipment(equipment)}
                        className="mr-2"
                      />
                      <label htmlFor={`equipment-${equipment}`} className="text-sm">
                        {equipment}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Difficulty Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Difficulty</h3>
                <div className="space-y-1">
                  {difficultyOptions.map(difficulty => (
                    <div key={difficulty} className="flex items-center">
                      <input
                        type="radio"
                        id={`difficulty-${difficulty}`}
                        name="difficulty"
                        checked={filters.difficulty === difficulty}
                        onChange={() => setFilters(prev => ({...prev, difficulty}))}
                        className="mr-2"
                      />
                      <label htmlFor={`difficulty-${difficulty}`} className="text-sm">
                        {difficulty}
                      </label>
                    </div>
                  ))}
                  {filters.difficulty && (
                    <button
                      onClick={() => setFilters(prev => ({...prev, difficulty: ''}))}
                      className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                    >
                      Clear difficulty
                    </button>
                  )}
                </div>
              </div>
              
              {/* Muscle Group Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Target Muscles</h3>
                <div className="space-y-1">
                  {muscleGroupOptions.map(muscleGroup => (
                    <div key={muscleGroup} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`muscle-${muscleGroup}`}
                        checked={filters.muscleGroups.includes(muscleGroup)}
                        onChange={() => toggleMuscleGroup(muscleGroup)}
                        className="mr-2"
                      />
                      <label htmlFor={`muscle-${muscleGroup}`} className="text-sm">
                        {muscleGroup}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          {/* Exercise List and Detail View */}
          <div className="w-full md:w-3/4">
            {/* Results count and sort */}
            <div className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {filteredExercises.length} {filteredExercises.length === 1 ? 'exercise' : 'exercises'} found
              </span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <select className="border rounded p-1 text-sm">
                  <option>Name (A-Z)</option>
                  <option>Difficulty</option>
                  <option>Most Used</option>
                </select>
              </div>
            </div>
            
            {selectedExercise ? (
              /* Exercise Detail View */
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{selectedExercise.name}</h2>
                    <button 
                      onClick={() => setSelectedExercise(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <img 
                        src={selectedExercise.media[0]?.url || '/api/placeholder/400/300'} 
                        alt={selectedExercise.name} 
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {selectedExercise.category}
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {selectedExercise.equipment}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {selectedExercise.difficulty}
                        </span>
                        {selectedExercise.isVerified && (
                          <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                            <CheckCircle size={12} className="mr-1" /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Description</h3>
                      <p className="text-gray-700 mb-4">{selectedExercise.description}</p>
                      
                      <h3 className="text-lg font-medium mb-2">Target Muscles</h3>
                      <div className="mb-4">
                        <div className="mb-2">
                          <span className="font-medium">Primary: </span>
                          {selectedExercise.targetMuscles
                            .filter(tm => tm.isPrimary)
                            .map(tm => tm.muscleGroup)
                            .join(', ')}
                        </div>
                        <div>
                          <span className="font-medium">Secondary: </span>
                          {selectedExercise.targetMuscles
                            .filter(tm => !tm.isPrimary)
                            .map(tm => tm.muscleGroup)
                            .join(', ')}
                        </div>
                      </div>
                      
                      <div className="flex mt-4">
                        <button 
                          onClick={() => addToWorkout(selectedExercise.exerciseId)}
                          className="bg-blue-600 text-white py-2 px-4 rounded flex items-center hover:bg-blue-700"
                        >
                          <Plus size={18} className="mr-1" /> Add to Workout
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Instructions</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedExercise.instructions}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Exercise List View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredExercises.length > 0 ? (
                  filteredExercises.map(exercise => (
                    <div 
                      key={exercise.exerciseId} 
                      className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      <img 
                        src={exercise.media[0]?.url || '/api/placeholder/400/300'} 
                        alt={exercise.name} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">{exercise.name}</h3>
                          {exercise.isVerified && (
                            <CheckCircle size={16} className="text-teal-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">
                          {exercise.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {exercise.category}
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {exercise.equipment}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {exercise.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToWorkout(exercise.exerciseId);
                            }}
                            className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
                          >
                            <Plus size={16} className="mr-1" /> Add to Workout
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedExercise(exercise);
                            }}
                            className="text-gray-600 text-sm hover:text-gray-800 flex items-center"
                          >
                            <Info size={16} className="mr-1" /> Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
                    <div className="text-gray-500 text-lg mb-2">No exercises found</div>
                    <p className="text-center text-gray-600">
                      Try adjusting your filters or search criteria
                    </p>
                    <button 
                      onClick={clearFilters}
                      className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2025 Fitness Tracker App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExercisePage;