"use client";
import Image from 'next/image';

const featuredRecipes = [
  {
    id: 1,
    name: 'Banana Pancakes',
    description: 'Fluffy pancakes with fresh bananas and maple syrup',
    image: '/assets/banana.svg',
    time: '20 min',
    difficulty: 'Easy'
  },
  {
    id: 2,
    name: 'Apple Salad',
    description: 'Fresh and crunchy apple salad with walnuts',
    image: '/assets/apple.svg',
    time: '15 min',
    difficulty: 'Easy'
  },
  {
    id: 3,
    name: 'Strawberry Smoothie',
    description: 'Refreshing smoothie with fresh strawberries',
    image: '/assets/strawberry.svg',
    time: '10 min',
    difficulty: 'Easy'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Text */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Meals, Save Time and Money
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover delicious recipes, create shopping lists, and manage your kitchen inventory all in one place.
          </p>
        </div>

        {/* Featured Recipes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-48">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {recipe.name}
                </h3>
                <p className="text-gray-600 mb-4">{recipe.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>⏱️ {recipe.time}</span>
                  <span>📊 {recipe.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
