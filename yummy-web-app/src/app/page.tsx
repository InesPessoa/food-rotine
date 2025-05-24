"use client";
import { useState } from 'react';
import { groceries as initialGroceries, GroceryItem } from '../data/groceries';

export default function Home() {
  const [groceries, setGroceries] = useState<GroceryItem[]>(initialGroceries);

  const handleQuantityChange = (id: string, delta: number) => {
    setGroceries(groceries =>
      groceries.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const total = groceries.reduce(
    (sum, item) => sum + item.pricePerUnit * item.quantity,
    0
  );

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Grocery List</h1>
      <div className="space-y-4">
        {groceries.map(item => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded shadow p-4 gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-contain rounded"
            />
            <div className="flex-1">
              <div className="font-semibold text-lg">{item.name}</div>
              <div className="text-sm text-gray-500">
                ${item.pricePerUnit}/kg
              </div>
              <div className="text-sm text-gray-500">
                {item.quantity} {item.unit}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => handleQuantityChange(item.id, -0.5)}
                  disabled={item.quantity <= 0}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => handleQuantityChange(item.id, 0.5)}
                >
                  +
                </button>
              </div>
              <div className="text-sm font-semibold">
                ${(item.pricePerUnit * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8 p-4 bg-gray-50 rounded shadow">
        <div>
          <div className="text-gray-600 text-sm">Total Items: {groceries.length}</div>
          <div className="text-xl font-bold">${total.toFixed(2)}</div>
          <div className="text-xs text-gray-400">Estimated Cost (incl. GST)</div>
        </div>
        <button className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-pink-600 transition">
          Checkout
        </button>
      </div>
    </div>
  );
}
