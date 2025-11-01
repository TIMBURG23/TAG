import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/mockApi';
import { Product } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { HeartIcon } from '../components/IconComponents';
import { useAuth } from '../context/AuthContext';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { user, isFavorited, toggleFavorite } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainImage, setMainImage] = useState<string>('');
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerError, setOfferError] = useState('');


  useEffect(() => {
    if (!productId) return;
    const loadProduct = async () => {
      setLoading(true);
      const fetchedProduct = await fetchProductById(productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setMainImage(fetchedProduct.images[0]);
      }
      setLoading(false);
    };
    loadProduct();
  }, [productId]);

  if (loading) return <LoadingSpinner />;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  const minOfferPrice = product.price * 0.7;

  const handleOpenOfferModal = () => {
    setOfferPrice('');
    setOfferError('');
    setIsOfferModalOpen(true);
  };

  const handleCloseOfferModal = () => {
    setIsOfferModalOpen(false);
  };

  const handleOfferSubmit = () => {
    const price = parseFloat(offerPrice);
    if (isNaN(price) || price <= 0) {
      setOfferError('Please enter a valid price.');
      return;
    }
    if (price < minOfferPrice) {
      setOfferError(`Your offer must be at least R ${minOfferPrice.toFixed(2)}.`);
      return;
    }
    setOfferError('');
    alert(`Your offer of R ${price.toFixed(2)} has been sent to the seller!`);
    handleCloseOfferModal();
  };


  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-surface rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery */}
            <div className="md:w-1/2">
               <div className="relative aspect-square">
                  <img src={mainImage} alt={product.title} className="absolute h-full w-full object-cover"/>
               </div>
               <div className="flex space-x-2 p-2 bg-background">
                  {product.images.map((img, index) => (
                      <button key={index} onClick={() => setMainImage(img)} className={`block h-16 w-16 rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-accent' : 'border-transparent'}`}>
                          <img src={img} alt={`${product.title} thumbnail ${index + 1}`} className="h-full w-full object-cover"/>
                      </button>
                  ))}
               </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 flex flex-col">
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <h1 className="text-2xl lg:text-3xl font-bold text-primary">{product.title}</h1>
                    {user && (
                      <button onClick={() => toggleFavorite(product.product_id)} aria-label="Favorite this item">
                        <HeartIcon filled={isFavorited(product.product_id)} />
                      </button>
                    )}
                </div>
                <p className="text-2xl font-bold text-accent my-3">R {product.price.toFixed(2)}</p>
                
                <Link to={`/shop/${product.shop_id}`} className="flex items-center space-x-4 border-y border-border py-4 my-4 group">
                    <img src={product.sellerProfilePic} alt={product.sellerName} className="w-12 h-12 rounded-full group-hover:ring-2 group-hover:ring-accent/50 transition-all"/>
                    <div>
                        <p className="text-sm text-secondary">Sold by</p>
                        <p className="font-semibold text-primary group-hover:text-accent transition-colors">{product.sellerName}</p>
                    </div>
                </Link>

                <div className="space-y-4 text-sm text-secondary">
                    <div className="grid grid-cols-2">
                        <span className="font-semibold text-primary">Condition:</span>
                        <span>{product.condition}</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span className="font-semibold text-primary">Brand:</span>
                        <span>{product.brand}</span>
                    </div>
                     <div className="grid grid-cols-2">
                        <span className="font-semibold text-primary">Category:</span>
                        <span>{product.category}</span>
                    </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-primary mb-2">Description</h3>
                  <p className="text-secondary leading-relaxed">{product.description}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border space-y-3">
                <button className="w-full bg-accent text-black font-bold py-3 rounded-lg hover:bg-accent-hover transition-colors">
                  Buy Now
                </button>
                <button onClick={handleOpenOfferModal} className="w-full bg-border text-primary font-bold py-3 rounded-lg hover:bg-gray-700 transition-colors">
                  Make an Offer
                </button>
                 <button className="w-full bg-transparent border border-border text-primary font-bold py-3 rounded-lg hover:bg-surface transition-colors">
                  Chat with seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={handleCloseOfferModal}>
          <div className="bg-surface rounded-lg shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-2">Make an Offer</h2>
            <p className="text-sm text-secondary mb-4">
              The seller is more likely to accept a reasonable offer. Your offer must be at least 70% of the asking price.
            </p>
            
            <div className="mb-4 p-3 bg-background rounded-md">
              <p className="text-sm">Original Price: <span className="font-semibold">R {product.price.toFixed(2)}</span></p>
              <p className="text-sm">Minimum Offer: <span className="font-semibold text-accent">R {minOfferPrice.toFixed(2)}</span></p>
            </div>

            <div>
              <label htmlFor="offerPrice" className="block text-sm font-medium text-secondary">Your Offer (R)</label>
              <input
                type="number"
                id="offerPrice"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder="e.g., 600.00"
                className={`mt-1 block w-full bg-background border-border rounded-md shadow-sm focus:ring-accent focus:border-accent ${offerError ? 'border-red-500' : ''}`}
                autoFocus
              />
              {offerError && <p className="text-red-500 text-xs mt-1">{offerError}</p>}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={handleCloseOfferModal}
                className="bg-border text-primary font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleOfferSubmit}
                className="bg-accent text-black font-bold py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors">
                Submit Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
