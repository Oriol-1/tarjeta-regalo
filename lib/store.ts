import { create } from 'zustand';
import { CartItem, User } from './types';

interface StoreState {
  user: User | null;
  cart: CartItem[];
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cardId: string, value: number) => void;
  clearCart: () => void;
  updateQuantity: (cardId: string, value: number, quantity: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  cart: [],
  setUser: (user) => set({ user }),
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (i) => i.cardId === item.cardId && i.value === item.value
      );
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.cardId === item.cardId && i.value === item.value
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (cardId, value) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.cardId === cardId && item.value === value)
      ),
    })),
  clearCart: () => set({ cart: [] }),
  updateQuantity: (cardId, value, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.cardId === cardId && item.value === value
          ? { ...item, quantity }
          : item
      ),
    })),
}));