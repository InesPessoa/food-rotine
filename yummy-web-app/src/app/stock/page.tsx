'use client';

import { useState } from 'react';
import { StockItem } from '../../data/stock';

export default function Stock() {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Stock</h1>
      <div className="space-y-4">
        {stockItems.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No items in stock yet. Add items from your grocery list!
          </div>
        ) : (
          stockItems.map(item => (
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
                  {item.quantity} {item.unit}
                </div>
                <div className="text-xs text-gray-400">
                  Added on {new Date(item.dateAdded).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 