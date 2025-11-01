import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchSellerProducts } from '../services/mockApi';
import { Product, ProductStatus } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const SellerDashboardPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.shop_id) {
            navigate('/');
            return;
        }

        const loadSellerData = async () => {
            setLoading(true);
            const sellerProducts = await fetchSellerProducts(user.shop_id!);
            setProducts(sellerProducts);
            setLoading(false);
        };
        loadSellerData();
    }, [user, navigate]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const activeListings = products.filter(p => p.status === ProductStatus.AVAILABLE);
    const soldItems = products.filter(p => p.status === ProductStatus.SOLD);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-primary mb-8">My Shop Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-surface p-6 rounded-lg shadow-md">
                    <h2 className="text-secondary text-sm font-medium mb-2">Available Balance</h2>
                    <p className="text-3xl font-bold text-accent">R {user?.wallet_balance.toFixed(2)}</p>
                    <button className="mt-4 w-full bg-accent text-black font-bold py-2 rounded-lg hover:bg-accent-hover text-sm">
                        Payout to bank
                    </button>
                </div>
                <div className="bg-surface p-6 rounded-lg shadow-md">
                    <h2 className="text-secondary text-sm font-medium mb-2">Active Listings</h2>
                    <p className="text-3xl font-bold text-primary">{activeListings.length}</p>
                </div>
                <div className="bg-surface p-6 rounded-lg shadow-md">
                    <h2 className="text-secondary text-sm font-medium mb-2">Total Items Sold</h2>
                    <p className="text-3xl font-bold text-primary">{soldItems.length}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-8">
                <Link to="/dashboard/new-listing" className="flex-1 text-center bg-accent text-black font-bold py-3 rounded-lg hover:bg-accent-hover transition-colors mb-2 sm:mb-0">
                    + Add New Listing
                </Link>
                <Link to="/dashboard/orders" className="flex-1 text-center bg-surface text-primary font-bold py-3 rounded-lg hover:bg-border transition-colors">
                    Manage Orders
                </Link>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold text-primary mb-4">Your Listings</h2>
                {products.length > 0 ? (
                     <div className="bg-surface rounded-lg shadow-md overflow-hidden">
                        <ul className="divide-y divide-border">
                        {products.map(product => (
                            <li key={product.product_id} className="p-4 flex items-center space-x-4">
                                <img src={product.images[0]} alt={product.title} className="w-16 h-16 rounded-md object-cover"/>
                                <div className="flex-grow">
                                    <p className="font-semibold text-primary">{product.title}</p>
                                    <p className="text-sm text-secondary">R {product.price.toFixed(2)}</p>
                                </div>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.status === ProductStatus.SOLD ? 'bg-border text-secondary' : 'bg-green-900/50 text-green-300'}`}>
                                    {product.status}
                                </span>
                            </li>
                        ))}
                        </ul>
                     </div>
                ) : (
                    <div className="text-center py-10 bg-surface rounded-lg shadow-md">
                        <p className="text-secondary">You haven't listed any items yet.</p>
                        <Link to="/dashboard/new-listing" className="text-accent font-semibold mt-2 inline-block">List your first item!</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerDashboardPage;