import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BagIcon, SearchIcon } from './IconComponents';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleAuth = () => {
    if (user) {
      logout();
      navigate('/');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleDashboardClick = () => {
      if(user?.shop_id) {
          navigate('/dashboard');
      } else {
          alert("Create a shop to access the dashboard!");
      }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-md border-b border-border z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-accent">TAG</Link>
              <div className="hidden md:flex md:ml-10 md:space-x-8">
                <Link to="/?category=Women" className="text-secondary hover:text-primary font-medium">Women</Link>
                <Link to="/?category=Men" className="text-secondary hover:text-primary font-medium">Men</Link>
                <Link to="/?category=Kids" className="text-secondary hover:text-primary font-medium">Kids</Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background text-primary placeholder-secondary focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center ml-4">
              {user ? (
                   <div className="flex items-center space-x-4">
                      <button onClick={handleDashboardClick} className="hidden sm:inline-block text-secondary hover:text-primary font-medium">My Shop</button>
                      <button onClick={() => navigate('/dashboard/orders')} className="p-2 rounded-full text-secondary hover:text-primary hover:bg-surface">
                          <BagIcon />
                      </button>
                      <button onClick={handleAuth} className="bg-surface text-primary hover:bg-border font-bold py-2 px-4 rounded-full text-sm">Logout</button>
                   </div>
              ) : (
                  <button onClick={handleAuth} className="bg-accent text-black hover:bg-accent-hover font-bold py-2 px-4 rounded-full text-sm">Login</button>
              )}
            </div>
          </div>
        </nav>
      </header>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default Header;
