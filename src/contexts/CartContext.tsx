import { createContext, useContext, useState } from "react";
import { MenuItem } from "../api/menu";

type CartContextType = {
  items: MenuItem[];
  addItem: (item: MenuItem) => void;
  submit: () => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  submit: () => {},
});

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  const addItem = (item: MenuItem) => {
    return setItems((items) => [...items, item]);
  };

  const submit = () => {
    console.log("submitting order");
    window.alert("Order Placed!");
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, submit }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
