export interface Category {
  id: number;
  name: string;
  path: string;
}

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  categoryId: number;
  price: number;
  imageURL: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  username: string;
  password: string;
  token: string;
}
