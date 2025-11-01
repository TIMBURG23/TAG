import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/mockApi';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-surface rounded-lg shadow-lg p-8 md:p-12 mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">Discover Unique Fashion</h1>
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
          Buy and sell new & pre-loved items from South Africa's most stylish closets.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-primary mb-6">Recently Added</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;