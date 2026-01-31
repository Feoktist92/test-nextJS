export interface DummyUserAddress {
  address?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  postalCode?: string;
  country?: string;
}

export interface DummyUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  address?: DummyUserAddress;
}

export interface LoginResponse extends DummyUser {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface DummyProduct {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}

export interface ProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage?: number;
  discountedTotal?: number;
  thumbnail?: string;
}

export interface DummyCart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal?: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartsResponse {
  carts: DummyCart[];
  total: number;
  skip: number;
  limit: number;
}

export interface AddCartRequest {
  userId: number;
  products: Array<{ id: number; quantity: number }>;
}

export interface SessionItem {
  title: string;
  price: number;
}
