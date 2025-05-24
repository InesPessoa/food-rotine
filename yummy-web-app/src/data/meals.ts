export type Meal = {
  id: string;
  name: string;
  dayOfWeek: string;
  ingredients: { name: string; quantity: number; unit: string }[];
};

export const meals: Meal[] = [
  {
    id: '1',
    name: 'Banana Pancakes',
    dayOfWeek: 'Monday',
    ingredients: [
      { name: 'Banana', quantity: 2, unit: 'pcs' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Flour', quantity: 100, unit: 'g' },
    ],
  },
  {
    id: '2',
    name: 'Apple Salad',
    dayOfWeek: 'Tuesday',
    ingredients: [
      { name: 'Apple', quantity: 2, unit: 'pcs' },
      { name: 'Lettuce', quantity: 1, unit: 'head' },
      { name: 'Walnuts', quantity: 30, unit: 'g' },
    ],
  },
]; 