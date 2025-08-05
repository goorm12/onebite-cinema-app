import { Cart, CartItem, CartItemRequest } from '../models/cart';
import { MovieData } from '../../../types/types';

export class CartService {
  private static STORAGE_KEY = 'onebite-cinema-cart';

  static getCart(): Cart {
    if (typeof window === 'undefined') {
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        updatedAt: new Date().toISOString()
      };
    }

    try {
      const cartData = localStorage.getItem(this.STORAGE_KEY);
      if (!cartData) {
        return this.createEmptyCart();
      }

      const cart = JSON.parse(cartData) as Cart;
      return this.calculateTotals(cart);
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return this.createEmptyCart();
    }
  }

  static saveCart(cart: Cart): void {
    if (typeof window === 'undefined') return;

    try {
      const updatedCart = {
        ...this.calculateTotals(cart),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }

  static addItem(movie: MovieData, request: CartItemRequest): Cart {
    const cart = this.getCart();
    const itemId = this.generateItemId(request);

    const existingItemIndex = cart.items.findIndex(item => item.id === itemId);

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += request.quantity;
    } else {
      const newItem: CartItem = {
        id: itemId,
        movie,
        quantity: request.quantity,
        price: request.price,
        selectedDate: request.selectedDate,
        selectedTime: request.selectedTime,
        selectedSeats: request.selectedSeats,
        addedAt: new Date().toISOString()
      };
      cart.items.push(newItem);
    }

    const updatedCart = this.calculateTotals(cart);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  static removeItem(itemId: string): Cart {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.id !== itemId);
    
    const updatedCart = this.calculateTotals(cart);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  static updateQuantity(itemId: string, quantity: number): Cart {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    const updatedCart = this.calculateTotals(cart);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  static clearCart(): Cart {
    const emptyCart = this.createEmptyCart();
    this.saveCart(emptyCart);
    return emptyCart;
  }

  private static generateItemId(request: CartItemRequest): string {
    return `${request.movieId}-${request.selectedDate}-${request.selectedTime}-${request.selectedSeats.join(',')}`;
  }

  private static createEmptyCart(): Cart {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      updatedAt: new Date().toISOString()
    };
  }

  private static calculateTotals(cart: Cart): Cart {
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return {
      ...cart,
      totalItems,
      totalPrice
    };
  }
}