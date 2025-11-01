import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { fetchUserByCredentials, toggleFavoriteApi } from '../services/mockApi';

interface AuthContextType {
  user: User | null;
  login: (identifier: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isFavorited: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (identifier: string) => {
    setLoading(true);
    const fetchedUser = await fetchUserByCredentials(identifier);
    if(fetchedUser){
        setUser(fetchedUser);
        setLoading(false);
        return true;
    }
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isFavorited = (productId: string): boolean => {
    return user?.favorites.includes(productId) ?? false;
  };

  const toggleFavorite = async (productId: string) => {
    if (!user) return;

    const isCurrentlyFavorited = user.favorites.includes(productId);
    
    // Optimistic update
    const updatedFavorites = isCurrentlyFavorited
      ? user.favorites.filter(id => id !== productId)
      : [...user.favorites, productId];
    
    setUser({ ...user, favorites: updatedFavorites });

    // API call
    const updatedUser = await toggleFavoriteApi(user.user_id, productId);
    if (!updatedUser) {
        // Revert on failure
        setUser(user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isFavorited, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
