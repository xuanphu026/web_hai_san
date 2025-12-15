export type Category = 'all' | 'tom' | 'cua' | 'ca';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string; // URL
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}