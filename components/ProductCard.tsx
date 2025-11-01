import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.product_id}`} className="group block bg-surface rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1">
      <div className="relative pt-[100%] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
            <img src={product.sellerProfilePic} alt={product.sellerName} className="w-6 h-6 rounded-full mr-2" />
            <p className="text-xs text-secondary truncate">{product.sellerName}</p>
        </div>
        <h3 className="text-sm font-semibold text-primary truncate group-hover:text-accent">{product.title}</h3>
        <p className="mt-1 text-md font-bold text-primary">R {product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;