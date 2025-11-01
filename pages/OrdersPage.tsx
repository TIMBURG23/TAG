import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchBuyerOrders, fetchSellerOrders } from '../services/mockApi';
import { Order, OrderStatus } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

type View = 'buyer' | 'seller';

const OrderItem: React.FC<{ order: Order, view: View }> = ({ order, view }) => {
    return (
        <li className="p-4 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <img src={order.product.images[0]} alt={order.product.title} className="w-24 h-24 rounded-md object-cover"/>
            <div className="flex-grow">
                <p className="font-semibold text-primary">{order.product.title}</p>
                <p className="text-sm text-secondary">Order #{order.order_id}</p>
                <p className="text-sm text-secondary">Total: R {order.total_price.toFixed(2)}</p>
            </div>
            <div className="w-full sm:w-auto text-left sm:text-right">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    order.order_status === OrderStatus.COMPLETED ? 'bg-green-900/50 text-green-300' : 
                    order.order_status === OrderStatus.SHIPPED ? 'bg-blue-900/50 text-blue-300' :
                    'bg-yellow-900/50 text-yellow-300'
                }`}>
                    {order.order_status}
                </span>
                {view === 'buyer' && order.order_status === OrderStatus.SHIPPED && (
                    <button className="mt-2 w-full sm:w-auto block bg-accent text-black text-sm font-bold py-2 px-4 rounded-lg hover:bg-accent-hover">
                        Item Received
                    </button>
                )}
                 {view === 'seller' && order.order_status === OrderStatus.PAID && (
                    <button className="mt-2 w-full sm:w-auto block bg-surface text-primary text-sm font-bold py-2 px-4 rounded-lg hover:bg-border">
                        Mark as Shipped
                    </button>
                )}
            </div>
        </li>
    )
}


const OrdersPage: React.FC = () => {
    const { user } = useAuth();
    const [view, setView] = useState<View>('buyer');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        
        const loadOrders = async () => {
            setLoading(true);
            let fetchedOrders: Order[] = [];
            if (view === 'buyer') {
                fetchedOrders = await fetchBuyerOrders(user.user_id);
            } else if (view === 'seller' && user.shop_id) {
                fetchedOrders = await fetchSellerOrders(user.shop_id);
            }
            setOrders(fetchedOrders);
            setLoading(false);
        };
        
        loadOrders();
    }, [user, view]);

    if (!user) {
        return <div className="text-center py-10">Please login to see your orders.</div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-primary mb-8">My Orders</h1>
            
            <div className="mb-6 border-b border-border">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setView('buyer')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${view === 'buyer' ? 'border-accent text-accent' : 'border-transparent text-secondary hover:text-primary hover:border-border'}`}>
                        My Purchases
                    </button>
                    {user.shop_id && (
                        <button onClick={() => setView('seller')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${view === 'seller' ? 'border-accent text-accent' : 'border-transparent text-secondary hover:text-primary hover:border-border'}`}>
                            Shop Sales
                        </button>
                    )}
                </nav>
            </div>
            
            {loading ? <LoadingSpinner /> : (
                <div className="bg-surface rounded-lg shadow-md">
                    {orders.length > 0 ? (
                        <ul className="divide-y divide-border">
                           {orders.map(order => <OrderItem key={order.order_id} order={order} view={view}/>)}
                        </ul>
                    ) : (
                        <p className="text-center py-10 text-secondary">
                            {view === 'buyer' ? "You haven't made any purchases yet." : "You don't have any sales yet."}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;