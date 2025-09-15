'use client';

import { useState, useEffect, useCallback } from 'react';

interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

// Global cart state to ensure all components share the same state
let globalCartItems: CartItem[] = [];
const globalListeners: (() => void)[] = [];

const notifyListeners = () => {
  globalListeners.forEach(listener => listener());
};

// Helper function to calculate total quantity
const calculateTotalQuantity = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(globalCartItems);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart items from localStorage
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const storedItems = localStorage.getItem('productButtonArray');
        if (storedItems) {
          const items = JSON.parse(storedItems);
          globalCartItems = items;
          setCartItems(items);
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();

    // Listen for storage changes (when cart is updated from other tabs)
    const handleStorageChange = () => {
      loadCartItems();
    };

    // Add listener to global listeners
    const updateListener = () => {
      setCartItems([...globalCartItems]);
    };
    globalListeners.push(updateListener);

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      // Remove listener from global listeners
      const index = globalListeners.indexOf(updateListener);
      if (index > -1) {
        globalListeners.splice(index, 1);
      }
    };
  }, []);

  // Add item to cart (with quantity handling)
  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    const existingItemIndex = globalCartItems.findIndex(cartItem => cartItem.id === item.id);
    
    let updatedItems: CartItem[];
    if (existingItemIndex > -1) {
      // Item exists, increase quantity
      updatedItems = [...globalCartItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      };
    } else {
      // New item, add with quantity 1
      updatedItems = [...globalCartItems, { ...item, quantity: 1 }];
    }
    
    globalCartItems = updatedItems;
    setCartItems(updatedItems);
    localStorage.setItem('productButtonArray', JSON.stringify(updatedItems));
    
    // Notify all listeners
    notifyListeners();
    
    // Trigger custom event for other components to listen
    const event = new CustomEvent('cartUpdated', { 
      detail: { action: 'add', item, count: calculateTotalQuantity(updatedItems) } 
    });
    window.dispatchEvent(event);
    console.log('Cart updated - added item:', item.title, 'New total quantity:', calculateTotalQuantity(updatedItems));
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((id: string) => {
    const updatedItems = globalCartItems.filter(item => item.id !== id);
    globalCartItems = updatedItems;
    setCartItems(updatedItems);
    localStorage.setItem('productButtonArray', JSON.stringify(updatedItems));
    
    // Notify all listeners
    notifyListeners();
    
    // Trigger custom event for other components to listen
    const event = new CustomEvent('cartUpdated', { 
      detail: { action: 'remove', id, count: calculateTotalQuantity(updatedItems) } 
    });
    window.dispatchEvent(event);
    console.log('Cart updated - removed item:', id, 'New total quantity:', calculateTotalQuantity(updatedItems));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    const updatedItems = globalCartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    globalCartItems = updatedItems;
    setCartItems(updatedItems);
    localStorage.setItem('productButtonArray', JSON.stringify(updatedItems));
    
    // Notify all listeners
    notifyListeners();
    
    // Trigger custom event for other components to listen
    const event = new CustomEvent('cartUpdated', { 
      detail: { action: 'update', id, quantity: newQuantity, count: calculateTotalQuantity(updatedItems) } 
    });
    window.dispatchEvent(event);
    console.log('Cart updated - updated quantity for item:', id, 'New quantity:', newQuantity);
  }, [removeFromCart]);

  // Check if item is in cart
  const isInCart = useCallback((id: string) => {
    return globalCartItems.some(item => item.id === id);
  }, []);

  // Get cart count (number of unique items)
  const getCartCount = useCallback(() => {
    return globalCartItems.length;
  }, []);

  // Get total quantity (sum of all quantities)
  const getTotalQuantity = useCallback(() => {
    return globalCartItems.reduce((total, item) => total + item.quantity, 0);
  }, []);

  // Get cart total
  const getCartTotal = useCallback(() => {
    return globalCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, []);

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    isInCart,
    getCartCount,
    getTotalQuantity,
    getCartTotal,
  };
};