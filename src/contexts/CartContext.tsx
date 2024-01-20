import { createContext, useContext, useState } from "react";
import { MenuItem } from "../api/menu";

export type CartItem = {
  foodItem: MenuItem
  quantity: number;
}

type CartContextType = {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  updateQuantity: (item: CartItem, operation: string) => void;
  submit: () => void;
  billAmount: number;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => { },
  updateQuantity: () => { },
  submit: () => { },
  billAmount: 0,
});

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [billAmount, setBillAmount] = useState(0);

  const addItem = (item: MenuItem) => {
    const key = item.name;
    const index = items.findIndex((item) => item.foodItem.name = key);
    const newItems = [...items];
    setBillAmount(billAmount + item.price);
    if (index >= 0) {
      newItems[index].quantity++;
      return setItems(newItems);
    }
    const newItem = { foodItem: item, quantity: 1 }
    return setItems((items) => [...items, newItem]);
  };

  const updateQuantity = (item: CartItem, operation: string) => {
    const newItems = [...items];
    const index = items.indexOf(item);
    if (operation==="increase"){
      newItems[index].quantity++;
      setBillAmount(billAmount + item.foodItem.price);
      return setItems(newItems);
    } else{
      const quantity = newItems[index].quantity;
      setBillAmount(billAmount - item.foodItem.price);
      if (quantity === 1) {
        return setItems(newItems.splice(index, 1));
      }
      newItems[index].quantity--;
      return setItems(newItems);
    }
  }

  const submit = () => {
    console.log("submitting order");
    window.alert("Order Placed!");
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, submit, billAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
