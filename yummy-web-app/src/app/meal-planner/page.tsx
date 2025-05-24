'use client';

import { meals } from '../../data/meals';

export default function MealPlanner() {
  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Meal Planner</h1>
      <div className="space-y-6">
        {meals.map(meal => (
          <div key={meal.id} className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-lg">{meal.name}</div>
              <span className="text-sm text-gray-500">{meal.dayOfWeek}</span>
            </div>
            <div className="ml-2">
              <div className="font-medium text-gray-700 mb-1">Ingredients:</div>
              <ul className="list-disc ml-5 text-gray-600">
                {meal.ingredients.map((ing, idx) => (
                  <li key={idx}>
                    {ing.name} - {ing.quantity} {ing.unit}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition"
              onClick={() => alert('Send ingredients to grocery list (to be implemented)')}
            >
              Send Ingredients to Grocery List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 