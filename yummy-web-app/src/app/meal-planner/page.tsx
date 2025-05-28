'use client';

import { useState, useMemo } from 'react';
import { meals } from '../../data/meals'; // Keep static import

// Define interfaces for the dynamic part
interface Meal {
  id: string;
  name: string;
  ingredients: string; // Simplify for now, can be changed later
}

interface DayPlan {
  id: string;
  day: string;
  meals: Meal[];
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
}

export default function MealPlanner() {
  // State for dynamic meal plan (days and their meals)
  const [mealPlan, setMealPlan] = useState<DayPlan[]>([]);
  const [newDayName, setNewDayName] = useState('');

  // State for the Add Meal modal
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [selectedDayForMeal, setSelectedDayForMeal] = useState<DayPlan | null>(null);
  const [newMealName, setNewMealName] = useState('');
  const [newMealIngredients, setNewMealIngredients] = useState('');

  // State for chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleAddDay = () => {
    if (newDayName.trim() === '') return;
    const newDay: DayPlan = {
      id: Date.now().toString(),
      day: newDayName.trim(),
      meals: [],
    };
    setMealPlan(prev => [...prev, newDay]);
    setNewDayName('');
  };

  const handleAddMealToDay = () => {
    if (!selectedDayForMeal || newMealName.trim() === '') return;

    const newMeal: Meal = {
      id: Date.now().toString(),
      name: newMealName.trim(),
      ingredients: newMealIngredients.trim(),
    };

    setMealPlan(prev =>
      prev.map(day =>
        day.id === selectedDayForMeal.id ? { ...day, meals: [...day.meals, newMeal] } : day
      )
    );
    setNewMealName('');
    setNewMealIngredients('');
    setShowAddMealModal(false);
    setSelectedDayForMeal(null);
  };

  const openAddMealModal = (day: DayPlan) => {
    setSelectedDayForMeal(day);
    setShowAddMealModal(true);
  };

  const closeAddMealModal = () => {
    setShowAddMealModal(false);
    setSelectedDayForMeal(null);
    setNewMealName('');
    setNewMealIngredients('');
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    // Add user message to state
    setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
    // Clear input
    setInputMessage('');
    // Simulate AI response (replace with actual AI call later)
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'This is a simulated AI response.', sender: 'ai' }]);
    }, 1000);
  };

  // Combine static and dynamic meals and group by day
  const allDays = useMemo(() => {
    const combinedMeals: DayPlan[] = [];

    // Add static meals, grouped by day
    meals.forEach(meal => {
      const dayIndex = combinedMeals.findIndex(day => day.day === meal.dayOfWeek);
      const simpleMeal: Meal = { // Convert static meal to dynamic Meal interface
        id: meal.id,
        name: meal.name,
        ingredients: meal.ingredients.map(ing => `${ing.name} - ${ing.quantity} ${ing.unit}`).join(', '),
      };
      if (dayIndex > -1) {
        combinedMeals[dayIndex].meals.push(simpleMeal);
      } else {
        combinedMeals.push({ id: meal.dayOfWeek, day: meal.dayOfWeek, meals: [simpleMeal] });
      }
    });

    // Add dynamic meals
    mealPlan.forEach(dayPlan => {
         const dayIndex = combinedMeals.findIndex(day => day.day === dayPlan.day);
         if (dayIndex > -1) {
             // Add dynamic meals to existing day if it exists
             dayPlan.meals.forEach(meal => combinedMeals[dayIndex].meals.push(meal));
         } else {
             // Add new dynamic day
             combinedMeals.push(dayPlan);
         }
    });

    // Sort days (optional, e.g., by a predefined week order or alphabetically)
     const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
     combinedMeals.sort((a, b) => {
        const aIndex = dayOrder.indexOf(a.day);
        const bIndex = dayOrder.indexOf(b.day);
        if (aIndex === -1 && bIndex === -1) return a.day.localeCompare(b.day); // Sort alphabetically if not in predefined order
        if (aIndex === -1) return 1; // Non-predefined days come after
        if (bIndex === -1) return -1; // Non-predefined days come after
        return aIndex - bIndex;
     });

    return combinedMeals;
  }, [meals, mealPlan]); // Recompute when static meals or dynamic plan changes

  return (
    <div className="max-w-full mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-inner">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Weekly Meal Planner</h1>

      {/* Weekly Planner Board */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
         <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Your Weekly Plan</h2>

        <div className="flex overflow-x-auto space-x-6 pb-4">
          {allDays.length === 0 ? (
            <div className="text-center text-gray-500 py-8 w-full">No days planned yet. Add a day to get started!</div>
          ) : (
            <>
              {allDays.map(day => (
                <div key={day.id} className="w-64 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm p-4 flex flex-col space-y-4 border border-gray-200">
                  <h4 className="font-bold text-lg border-b pb-3 text-gray-800 text-center">{day.day}</h4>
                   <div className="flex-1 space-y-3">
                      {day.meals.length === 0 ? (
                          <div className="text-sm text-gray-500 text-center">No meals planned.</div>
                      ) : (
                          day.meals.map(meal => (
                              <div key={meal.id} className="bg-white rounded-md p-3 shadow-sm text-sm border border-gray-200 hover:shadow-md transition">
                                  <div className="font-semibold text-gray-700 mb-1">{meal.name}</div>
                                  <div className="text-gray-600">{meal.ingredients || 'No ingredients listed'}</div>
                              </div>
                          ))
                      )}
                   </div>
                  
                  {/* Add Meal Button for this Day */}
                   <button
                      onClick={() => openAddMealModal(day)}
                      className="w-full mt-auto p-2 bg-pink-600 text-white rounded-md font-semibold hover:bg-pink-700 transition text-sm shadow-sm"
                   >
                      + Add Meal
                   </button>
                </div>
              ))}
              
              {/* Add New Day Card */}
              <div className="w-64 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm p-4 flex flex-col space-y-4 border border-gray-200 border-dashed">
                <h4 className="font-bold text-lg border-b pb-3 text-gray-800 text-center">Add New Day</h4>
                <div className="flex-1 flex flex-col justify-center">
                  <input
                    type="text"
                    placeholder="e.g., Wednesday"
                    value={newDayName}
                    onChange={(e) => setNewDayName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-3"
                  />
                  <button
                    onClick={handleAddDay}
                    className="w-full p-2 bg-blue-600 text-white rounded-md font-semibold shadow-sm hover:bg-blue-700 transition"
                  >
                    Add Day
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddMealModal && selectedDayForMeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"> {/* Added z-50 for layering */}
              <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl"> {/* Added shadow-xl */}
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Add Meal to {selectedDayForMeal.day}</h2> {/* Styled title */}
                  <div className="space-y-4">
                      <input
                          type="text"
                          placeholder="Meal Name"
                          value={newMealName}
                          onChange={(e) => setNewMealName(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                      />
                      <textarea
                          placeholder="Ingredients (comma separated)"
                          value={newMealIngredients}
                          onChange={(e) => setNewMealIngredients(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                          rows={3}
                      ></textarea>
                      <button
                          onClick={handleAddMealToDay}
                          className="w-full p-2 bg-pink-600 text-white rounded-md font-semibold hover:bg-pink-700 transition shadow-sm"
                      >
                          Add Meal
                      </button>
                      <button
                          onClick={closeAddMealModal}
                          className="w-full p-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition shadow-sm mt-2"
                      >
                          Cancel
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* AI Assistant Chat Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8"> {/* Styled section */}
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">AI Assistant</h2> {/* Styled title */}
        <div className="h-64 overflow-y-auto border border-gray-300 rounded-md p-3 mb-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">Start a conversation...</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {msg.text}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition shadow-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}