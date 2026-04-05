"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "./products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; size: string }
  | { type: "REMOVE_ITEM"; productId: string; size: string }
  | { type: "UPDATE_QTY"; productId: string; size: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id && i.size === action.size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id && i.size === action.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, size: action.size, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) => !(i.product.id === action.productId && i.size === action.size)
        ),
      };
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.product.id === action.productId && i.size === action.size)
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId && i.size === action.size
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "eriu_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage on first mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved) as CartItem[];
        if (Array.isArray(items)) {
          dispatch({ type: "HYDRATE", items });
        }
      }
    } catch {
      // Ignore parse errors — start with empty cart
    }
    setHydrated(true);
  }, []);

  // Persist cart to localStorage whenever it changes (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore write errors (e.g. private browsing quota)
    }
  }, [state.items, hydrated]);

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  // Round to 2 decimal places to avoid floating-point drift
  const cartTotal =
    Math.round(
      state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0) * 100
    ) / 100;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartCount,
        cartTotal,
        addItem: (product, size) =>
          dispatch({ type: "ADD_ITEM", product, size }),
        removeItem: (productId, size) =>
          dispatch({ type: "REMOVE_ITEM", productId, size }),
        updateQty: (productId, size, quantity) =>
          dispatch({ type: "UPDATE_QTY", productId, size, quantity }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
