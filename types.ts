export enum ProductCondition {
  NEW = 'New',
  'Used - Like New' = 'Used - Like New',
  'Used - Good' = 'Used - Good',
  'Used - Fair' = 'Used - Fair',
}

export enum ProductStatus {
  AVAILABLE = 'Available',
  SOLD = 'Sold',
  RESERVED = 'Reserved',
  HIDDEN = 'Hidden',
}

export enum OrderStatus {
  PENDING_PAYMENT = 'Pending Payment',
  PAID = 'Paid',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  COMPLETED = 'Completed',
  DISPUTED = 'Disputed',
  CANCELLED = 'Cancelled',
}

export interface User {
  user_id: string;
  email: string;
  phone_number?: string;
  shop_id?: string;
  wallet_balance: number;
  favorites: string[];
}

export interface Shop {
  shop_id: string;
  user_id: string;
  shop_name: string;
  shop_url_slug: string;
  profile_picture_url: string;
  shop_description: string;
}

export interface Product {
  product_id: string;
  shop_id: string;
  title: string;
  description: string;
  price: number;
  condition: ProductCondition;
  quantity: number;
  status: ProductStatus;
  images: string[];
  category: string;
  brand: string;
  sellerName: string;
  sellerProfilePic: string;
}

export interface Order {
  order_id: string;
  buyer_user_id: string;
  product: Product;
  seller_shop_id: string;
  quantity: number;
  purchase_price: number;
  shipping_fee: number;
  buyer_protection_fee: number;
  total_price: number;
  order_status: OrderStatus;
  shipping_address: string;
  tracking_number?: string;
  order_date: string;
}
