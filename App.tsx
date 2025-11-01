import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import NewListingPage from './pages/NewListingPage';
import OrdersPage from './pages/OrdersPage';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import SellerProfilePage from './pages/SellerProfilePage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="bg-background min-h-screen font-sans text-primary">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/shop/:shopId" element={<SellerProfilePage />} />
              <Route path="/dashboard" element={<SellerDashboardPage />} />
              <Route path="/dashboard/new-listing" element={<NewListingPage />} />
              <Route path="/dashboard/orders" element={<OrdersPage />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;