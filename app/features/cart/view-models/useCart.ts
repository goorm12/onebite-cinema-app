'use client';

import { useState, useEffect, useCallback } from 'react';
import { Cart, CartItemRequest } from '../models/cart';
import { CartService } from '../services/cartService';
import { MovieData } from '../../../types/types';

interface UseCartState extends Cart {
  loading: boolean;
  error: string | null;
}

interface UseCartActions {
  addToCart: (movie: MovieData, request: CartItemRequest) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => void;
}

export function useCart(): UseCartState & UseCartActions {
  const [state, setState] = useState<UseCartState>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    updatedAt: '',
    loading: true,
    error: null
  });

  const loadCart = useCallback(() => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const cart = CartService.getCart();
      setState(prev => ({
        ...prev,
        ...cart,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load cart',
        loading: false
      }));
    }
  }, []);

  const addToCart = useCallback(async (movie: MovieData, request: CartItemRequest) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedCart = CartService.addItem(movie, request);
      setState(prev => ({
        ...prev,
        ...updatedCart,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to add item to cart',
        loading: false
      }));
    }
  }, []);

  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedCart = CartService.removeItem(itemId);
      setState(prev => ({
        ...prev,
        ...updatedCart,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to remove item from cart',
        loading: false
      }));
    }
  }, []);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedCart = CartService.updateQuantity(itemId, quantity);
      setState(prev => ({
        ...prev,
        ...updatedCart,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update quantity',
        loading: false
      }));
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const emptyCart = CartService.clearCart();
      setState(prev => ({
        ...prev,
        ...emptyCart,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to clear cart',
        loading: false
      }));
    }
  }, []);

  const refreshCart = useCallback(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart
  };
}