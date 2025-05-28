export type StockItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  image: string;
  dateAdded: string;
};

export const stock: StockItem[] = []; 