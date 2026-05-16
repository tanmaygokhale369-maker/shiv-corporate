"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, ProductVariant } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, variant) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.variant?.id === variant?.id
        );

        if (existingIndex > -1) {
          const newItems = [...items];
          newItems[existingIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          set({ items: [...items, { product, quantity, variant }] });
        }
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (item) =>
              !(item.product.id === productId && item.variant?.id === variantId)
          ),
        });
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        const newItems = get().items.map((item) =>
          item.product.id === productId && item.variant?.id === variantId
            ? { ...item, quantity }
            : item
        );
        set({ items: newItems });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      subtotal: () =>
        get().items.reduce((acc, item) => {
          const price = item.product.offer_price || item.product.price;
          const variantMod = item.variant?.price_modifier || 0;
          return acc + (price + variantMod) * item.quantity;
        }, 0),
    }),
    {
      name: "shiv-corporate-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
