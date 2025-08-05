import { MovieData } from '../../../types/types';

export interface CartItem {
  id: string;
  movie: MovieData;
  quantity: number;
  price: number;
  selectedDate: string;
  selectedTime: string;
  selectedSeats: string[];
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt: string;
}

export interface TicketOption {
  date: string;
  time: string;
  seats: string[];
  price: number;
}

export interface CartItemRequest {
  movieId: number;
  quantity: number;
  selectedDate: string;
  selectedTime: string;
  selectedSeats: string[];
  price: number;
}