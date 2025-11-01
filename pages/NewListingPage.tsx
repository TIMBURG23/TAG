import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Product, ProductCondition, ProductStatus } from '../types';
import { addProduct } from '../services/mockApi';
import { generateProductDescription } from '../services/geminiService';
import { SparklesIcon } from '../components/IconComponents';

const NewListingPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    // Fix: Used bracket notation to access enum member with special characters.
    const [condition, setCondition] = useState<ProductCondition>(ProductCondition['Used - Good']);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('Women');
    const [keywords, setKeywords] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    
    const handleGenerateDescription = async () => {
        if (!keywords) {
            alert("Please enter some keywords first.");
            return;
        }
        setIsGenerating(true);
        const generatedDesc = await generateProductDescription(keywords);
        setDescription(generatedDesc);
        setIsGenerating(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.shop_id) {
            alert('You must be logged in and have a shop to create a listing.');
            return;
        }
        const newProductData = {
            shop_id: user.shop_id,
            title,
            description,
            price: parseFloat(price),
            condition,
            quantity: 1,
            status: ProductStatus.AVAILABLE,
            images: ['https://picsum.photos/seed/' + Date.now() + '/800/800'], // Mock image
            category,
            brand,
            sellerName: 'Your Shop', // This would come from user's shop data
            sellerProfilePic: 'https://picsum.photos/seed/shop1/100/100',
        };
        await addProduct(newProductData as Omit<Product, 'product_id'>);
        navigate('/dashboard');
    };

    const inputStyles = "mt-1 block w-full bg-background border-border rounded-md shadow-sm focus:ring-accent focus:border-accent";

    return (
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-primary mb-8">Create a New Listing</h1>
            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-secondary">Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className={inputStyles} />
                </div>

                <div>
                    <label htmlFor="keywords" className="block text-sm font-medium text-secondary">Description Keywords</label>
                    <p className="text-xs text-secondary/70 mb-1">Enter keywords like "blue floral summer dress size 10 cotton" and let AI write the description for you.</p>
                    <div className="flex space-x-2">
                        <input type="text" id="keywords" value={keywords} onChange={e => setKeywords(e.target.value)} className={`flex-grow ${inputStyles}`} />
                        <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-gray-600 disabled:text-secondary">
                            <SparklesIcon />
                            <span className="ml-2">{isGenerating ? 'Generating...' : 'Generate'}</span>
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-secondary">Description</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className={inputStyles}></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-secondary">Price (R)</label>
                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required className={inputStyles} />
                    </div>
                    <div>
                        <label htmlFor="condition" className="block text-sm font-medium text-secondary">Condition</label>
                        <select id="condition" value={condition} onChange={e => setCondition(e.target.value as ProductCondition)} className={inputStyles}>
                            {Object.values(ProductCondition).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-secondary">Brand</label>
                        <input type="text" id="brand" value={brand} onChange={e => setBrand(e.target.value)} required className={inputStyles} />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-secondary">Category</label>
                         <select id="category" value={category} onChange={e => setCategory(e.target.value)} className={inputStyles}>
                            <option>Women</option>
                            <option>Men</option>
                            <option>Kids</option>
                            <option>Home</option>
                            <option>Beauty</option>
                        </select>
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full bg-accent text-black font-bold py-3 rounded-lg hover:bg-accent-hover transition-colors">
                        List Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewListingPage;