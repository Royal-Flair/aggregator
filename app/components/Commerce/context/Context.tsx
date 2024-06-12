"use client";

import { useState } from "react";
import CartContext, { CartContextProps } from "./CartContext";
import { Stripe } from "stripe";
import _ from "lodash";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Stripe.Price[]>([]);

  const remove = (priceID: string) => {
    let updatedItems = _.reject(items, (item) => item.id === priceID);
    setItems(updatedItems);
  };

  const add = (product: Stripe.Price) => {
    let updatedItems = _.union(items, [product]);
    setItems(updatedItems);
  };

  const cartContext: CartContextProps = {
    items,
    add,
    remove,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
