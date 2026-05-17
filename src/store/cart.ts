"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";
import { getPrice } from "@/data/products";
import type { UserGrade } from "@/store/auth";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  /** 등급별 가격 기준 합계 */
  total: (grade: UserGrade | null | undefined) => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...s.items, { product, qty }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          items: s.items.map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
        })),
      clear: () => set({ items: [] }),
      total: (grade) =>
        get().items.reduce((sum, i) => sum + getPrice(i.product, grade) * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: "g1-cart-storage" }
  )
);
