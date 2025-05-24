export type GroceryItem = {
  id: string;
  name: string;
  pricePerUnit: number;
  quantity: number;
  unit: string;
  image: string;
};

export const groceries: GroceryItem[] = [
  {
    id: '1',
    name: 'Banana',
    pricePerUnit: 7,
    quantity: 0.5,
    unit: 'kg',
    image: '/images/banana.png',
  },
  {
    id: '2',
    name: 'Apple',
    pricePerUnit: 4,
    quantity: 1,
    unit: 'kg',
    image: '/images/apple.png',
  },
  {
    id: '3',
    name: 'Strawberry',
    pricePerUnit: 4,
    quantity: 1.5,
    unit: 'kg',
    image: '/images/strawberry.png',
  },
]; 