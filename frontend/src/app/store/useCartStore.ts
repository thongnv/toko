// https://hackernoon.com/how-to-build-a-shopping-cart-with-nextjs-and-zustand-state-management-with-typescript

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "../components/Products";

export interface ProductCartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
  selected: boolean;
}

interface State {
  cart: ProductCartItem[];
}

interface Actions {
  addToCart: (Product: Product) => void;
  updateCart: (Cart: ProductCartItem[]) => void;
  removeFromCart: (Item: ProductCartItem) => void;
  removeOneFromCart: (Item: ProductCartItem) => void;
}

const INITIAL_STATE: State = {
  cart: [],
};

console.log("reload state..................");

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.product.id === product.id);
        let updatedCart: ProductCartItem[];
        if (cartItem) {
          updatedCart = cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
          );
        } else {
          const addedItem: ProductCartItem = {
            product,
            quantity: 1,
            totalPrice: product.attributes.price,
            selected: false,
          };
          updatedCart = [...cart, addedItem];
        }
        set(() => ({
          cart: updatedCart,
        }));
      },
      removeFromCart: (item: ProductCartItem) => {
        set((state) => ({
          cart: state.cart.filter((i) => i.product.id !== item.product.id),
        }));
      },
      removeOneFromCart: (item: ProductCartItem) => {
        const cart = get().cart;
        const cartItem = cart.find((i) => i.product.id === item.product.id);
        if (cartItem) {
          set(() => ({
            cart,
          }));
        }
      },
      updateCart: (cart: ProductCartItem[]) => {
        set(() => ({
          cart,
          totalItems: cart.length,
        }));
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
