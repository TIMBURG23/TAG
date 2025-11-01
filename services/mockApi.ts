import { Product, ProductCondition, ProductStatus, User, Order, OrderStatus, Shop } from '../types';

const users: User[] = [
    { user_id: 'user1', email: 'seller@example.com', phone_number: '0821234567', shop_id: 'shop1', wallet_balance: 1250.00, favorites: ['prod3'] },
    { user_id: 'user2', email: 'buyer@example.com', wallet_balance: 200.00, favorites: [] },
];

const shops: Shop[] = [
    {
        shop_id: 'shop1',
        user_id: 'user1',
        shop_name: 'Retro Threads',
        shop_url_slug: 'retro-threads',
        profile_picture_url: 'https://picsum.photos/seed/shop1/100/100',
        shop_description: 'Your one-stop shop for curated vintage and retro fashion. Find unique pieces to express your style.'
    },
    {
        shop_id: 'shop2',
        user_id: 'user3', 
        shop_name: 'Chic Finds',
        shop_url_slug: 'chic-finds',
        profile_picture_url: 'https://picsum.photos/seed/shop2/100/100',
        shop_description: 'Discover elegant and minimalist fashion essentials. High-quality pre-loved items for the modern wardrobe.'
    }
];

const products: Product[] = [
    {
        product_id: 'prod1',
        shop_id: 'shop1',
        title: 'Vintage Denim Jacket',
        description: 'A beautifully preserved denim jacket from the 90s. Perfect for a retro look. Features classic button closures and two chest pockets. Lightly worn, adding to its authentic vintage character.',
        price: 750.00,
        condition: ProductCondition['Used - Good'],
        quantity: 1,
        status: ProductStatus.AVAILABLE,
        images: ['https://picsum.photos/seed/prod1/800/800', 'https://picsum.photos/seed/prod1_2/800/800'],
        category: 'Women',
        brand: 'Levi\'s',
        sellerName: 'Retro Threads',
        sellerProfilePic: 'https://picsum.photos/seed/shop1/100/100'
    },
    {
        product_id: 'prod2',
        shop_id: 'shop1',
        title: 'Brand New Nike Air Max',
        description: 'Never worn, in original box. Latest model with superior cushioning and sleek design. Color: Phantom Black. Size: UK 9.',
        price: 2200.00,
        condition: ProductCondition.NEW,
        quantity: 1,
        status: ProductStatus.AVAILABLE,
        images: ['https://picsum.photos/seed/prod2/800/800', 'https://picsum.photos/seed/prod2_2/800/800', 'https://picsum.photos/seed/prod2_3/800/800'],
        category: 'Men',
        brand: 'Nike',
        sellerName: 'Retro Threads',
        sellerProfilePic: 'https://picsum.photos/seed/shop1/100/100'
    },
    {
        product_id: 'prod3',
        shop_id: 'shop2',
        title: 'Minimalist Leather Handbag',
        description: 'Elegant and simple handbag from a high-end brand. Used like new, no scratches or marks. Comes with original dust bag.',
        price: 1500.00,
        condition: ProductCondition['Used - Like New'],
        quantity: 1,
        status: ProductStatus.AVAILABLE,
        images: ['https://picsum.photos/seed/prod3/800/800'],
        category: 'Women',
        brand: 'Zara',
        sellerName: 'Chic Finds',
        sellerProfilePic: 'https://picsum.photos/seed/shop2/100/100'
    },
    {
        product_id: 'prod4',
        shop_id: 'shop2',
        title: 'Cozy Wool Scarf',
        description: 'A very warm and stylish scarf for winter. Good condition with some minor pilling.',
        price: 250.00,
        condition: ProductCondition['Used - Good'],
        quantity: 1,
        status: ProductStatus.SOLD,
        images: ['https://picsum.photos/seed/prod4/800/800'],
        category: 'Kids',
        brand: 'Unbranded',
        sellerName: 'Chic Finds',
        sellerProfilePic: 'https://picsum.photos/seed/shop2/100/100'
    },
];

const orders: Order[] = [
    {
        order_id: 'order1',
        buyer_user_id: 'user2',
        product: products[3],
        seller_shop_id: 'shop2',
        quantity: 1,
        purchase_price: 250.00,
        shipping_fee: 60.00,
        buyer_protection_fee: 27.45,
        total_price: 337.45,
        order_status: OrderStatus.COMPLETED,
        shipping_address: '123 Buyer St, Cape Town, 8001',
        tracking_number: 'PAXI123456789',
        order_date: '2023-10-15T14:48:00.000Z'
    },
    {
        order_id: 'order2',
        buyer_user_id: 'user2',
        product: products[0],
        seller_shop_id: 'shop1',
        quantity: 1,
        purchase_price: 700.00,
        shipping_fee: 60.00,
        buyer_protection_fee: 49.95,
        total_price: 809.95,
        order_status: OrderStatus.SHIPPED,
        shipping_address: 'Pudo Locker #55, Johannesburg',
        tracking_number: 'PUDO987654321',
        order_date: '2023-10-28T09:12:00.000Z'
    }
]

export const fetchProducts = async (): Promise<Product[]> => {
    return new Promise(resolve => setTimeout(() => resolve(products.filter(p => p.status === ProductStatus.AVAILABLE)), 500));
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
    return new Promise(resolve => setTimeout(() => resolve(products.find(p => p.product_id === id)), 500));
};

export const fetchUserByCredentials = async (identifier: string): Promise<User | undefined> => {
    return new Promise(resolve => setTimeout(() => resolve(users.find(u => u.email === identifier || u.phone_number === identifier)), 500));
}

export const fetchSellerProducts = async (shopId: string): Promise<Product[]> => {
    return new Promise(resolve => setTimeout(() => resolve(products.filter(p => p.shop_id === shopId)), 500));
}

export const fetchShopById = async (id: string): Promise<Shop | undefined> => {
    return new Promise(resolve => setTimeout(() => resolve(shops.find(s => s.shop_id === id)), 500));
};

export const fetchSellerOrders = async (shopId: string): Promise<Order[]> => {
    return new Promise(resolve => setTimeout(() => resolve(orders.filter(o => o.seller_shop_id === shopId)), 500));
}

export const fetchBuyerOrders = async (userId: string): Promise<Order[]> => {
    return new Promise(resolve => setTimeout(() => resolve(orders.filter(o => o.buyer_user_id === userId)), 500));
}

export const addProduct = async (productData: Omit<Product, 'product_id'>): Promise<Product> => {
    const newProduct: Product = {
        ...productData,
        product_id: `prod${Date.now()}`
    };
    products.unshift(newProduct);
    return new Promise(resolve => setTimeout(() => resolve(newProduct), 500));
}

export const toggleFavoriteApi = async (userId: string, productId: string): Promise<User | undefined> => {
    return new Promise(resolve => setTimeout(() => {
        const user = users.find(u => u.user_id === userId);
        if (user) {
            const index = user.favorites.indexOf(productId);
            if (index > -1) {
                user.favorites.splice(index, 1);
            } else {
                user.favorites.push(productId);
            }
            resolve(user);
        }
        resolve(undefined);
    }, 200));
}
