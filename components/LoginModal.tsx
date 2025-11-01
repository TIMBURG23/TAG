import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!identifier) {
        setError('Please enter your email or phone number.');
        return;
    }
    const success = await login(identifier);
    if (success) {
      onClose();
      setIdentifier('');
    } else {
      setError('No user found with that email or phone number.');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-lg shadow-xl p-6 w-full max-w-sm" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-primary mb-2 text-center">Welcome Back</h2>
        <p className="text-sm text-secondary mb-6 text-center">
            Login with your email or phone number.
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-secondary">Email or Phone Number</label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g., seller@example.com"
              className="mt-1 block w-full bg-background border-border rounded-md shadow-sm focus:ring-accent focus:border-accent"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <div className="mt-6">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-black font-bold py-2.5 px-4 rounded-lg hover:bg-accent-hover transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
