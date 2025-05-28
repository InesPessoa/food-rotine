'use client';

import { useState, useEffect } from 'react';
import { StockItem } from '../../data/stock';
import Image from 'next/image';

const dummyStockItems: StockItem[] = [
  {
    id: '1',
    name: 'Banana',
    quantity: 2,
    unit: 'kg',
    image: '/assets/items/banana.svg',
    dateAdded: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Apple',
    quantity: 1.5,
    unit: 'kg',
    image: '/assets/items/apple.svg',
    dateAdded: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Strawberry',
    quantity: 1,
    unit: 'kg',
    image: '/assets/items/strawberry.svg',
    dateAdded: new Date().toISOString(),
  }
];

const favoriteItems = [
  { name: 'Milk', image: '/assets/items/milk.svg' },
  { name: 'Eggs', image: '/assets/items/eggs.svg' },
  { name: 'Bread', image: '/assets/items/bread.svg' },
  { name: 'Cheese', image: '/assets/items/cheese.svg' },
  { name: 'Yogurt', image: '/assets/items/yogurt.svg' },
  { name: 'Butter', image: '/assets/items/butter.svg' },
];

export default function Stock() {
  const [stockItems, setStockItems] = useState<StockItem[]>(dummyStockItems);
  const [activeTab, setActiveTab] = useState<'favorites' | 'search' | 'create' | 'upload'>('favorites');
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemoveFromStock = (id: string) => {
    setStockItems(prev => prev.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setStockItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const handleAddItem = (item: { name: string; image: string }) => {
    const newItem: StockItem = {
      id: Date.now().toString(),
      name: item.name,
      quantity: 1,
      unit: 'pcs',
      image: item.image,
      dateAdded: new Date().toISOString(),
    };
    setStockItems(prev => [...prev, newItem]);
  };

  const handleAddToGroceries = (item: StockItem) => {
    // This would typically call an API or update a shared state
    console.log('Adding to groceries:', item);
    alert(`Added ${item.name} to groceries!`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Stock</h1>

      {/* Stock Items List */}
      <div className="space-y-4 mb-8">
        {stockItems.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No items in stock yet. Add items using the options below!
          </div>
        ) : (
          stockItems.map(item => (
            <div
              key={item.id}
              className="flex items-center bg-white rounded shadow p-4 gap-4"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="rounded"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg">{item.name}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -0.5)}
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">
                    {item.quantity} {item.unit}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 0.5)}
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {isClient ? `Added on ${new Date(item.dateAdded).toLocaleDateString()}` : 'Added on...'}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToGroceries(item)}
                  className="px-3 py-1 text-green-500 hover:text-green-600 border border-green-200 rounded hover:bg-green-50"
                >
                  Add to Groceries
                </button>
                <button
                  onClick={() => handleRemoveFromStock(item.id)}
                  className="px-3 py-1 text-red-500 hover:text-red-600 border border-red-200 rounded hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Item Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Items</h2>
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'favorites' ? 'border-b-2 border-pink-500' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'search' ? 'border-b-2 border-pink-500' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            Search
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'create' ? 'border-b-2 border-pink-500' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create New
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'upload' ? 'border-b-2 border-pink-500' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload Photo
          </button>
        </div>

        <div className="min-h-[200px]">
          {activeTab === 'favorites' && (
            <div className="grid grid-cols-3 gap-4">
              {favoriteItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => handleAddItem(item)}
                  className="flex flex-col items-center p-4 border rounded hover:bg-gray-50"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'search' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="text-center text-gray-500">
                Search functionality will be implemented here
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    placeholder="Item name"
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="w-1/2 p-2 border rounded"
                    />
                    <select className="w-1/2 p-2 border rounded">
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="g">Grams</option>
                      <option value="l">Liters</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="w-full p-2 bg-pink-500 text-white rounded">
                Create Item
              </button>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="text-center space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer"
                >
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>Click to upload a photo of your items</p>
                    <p className="text-sm">We&apos;ll automatically detect what you have</p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 