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
    image: '/assets/items/banana.svg',
  },
  {
    id: '2',
    name: 'Apple',
    pricePerUnit: 4,
    quantity: 1,
    unit: 'kg',
    image: '/assets/items/apple.svg',
  },
  {
    id: '3',
    name: 'Strawberry',
    pricePerUnit: 4,
    quantity: 1.5,
    unit: 'kg',
    image: '/assets/items/strawberry.svg',
  },
]; 