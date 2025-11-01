import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSellerProducts, fetchShopById } from '../services/mockApi';
import { Product, Shop, ProductStatus } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';

const SellerProfilePage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!shopId) return;

    const loadData = async () => {
      setLoading(true);
      const [shopData, productsData] = await Promise.all([
        fetchShopById(shopId),
        fetchSellerProducts(shopId),
      ]);
      
      if (shopData) {
        setShop(shopData);
      }
      setProducts(productsData.filter(p => p.status === ProductStatus.AVAILABLE));
      setLoading(false);
    };

    loadData();
  }, [shopId]);

  if (loading) return <LoadingSpinner />;
  if (!shop) return <div className="text-center py-10">Shop not found.</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-surface rounded-lg shadow-lg p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        <img src={shop.profile_picture_url} alt={shop.shop_name} className="w-32 h-32 rounded-full ring-4 ring-accent/20"/>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary text-center md:text-left">{shop.shop_name}</h1>
          <p className="text-md text-secondary mt-2 max-w-xl text-center md:text-left">
            {shop.shop_description}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-primary mb-6">Items from {shop.shop_name}</h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-surface rounded-lg shadow-md">
            <p className="text-secondary">This shop has no available items right now.</p>
        </div>
      )}
    </div>
  );
};

export default SellerProfilePage;