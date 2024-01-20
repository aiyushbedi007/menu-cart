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
  count: number;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => { },
  updateQuantity: () => { },
  submit: () => { },
  billAmount: 0,
  count: 0
});

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [billAmount, setBillAmount] = useState(0);
  const [count, setCount] = useState(0);


  const addItem = (item: MenuItem) => {
    const key = item.name;
    const index = items.findIndex((cartItem) => cartItem.foodItem.name === key);
    const newItems = [...items];
    setCount(count + 1);
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
    if (operation === "increase") {
      newItems[index].quantity++;
      setCount(count + 1);
      setBillAmount(billAmount + item.foodItem.price);
      return setItems(newItems);
    } else {
      setCount(count - 1)
      const quantity = newItems[index].quantity;
      if (quantity === 1) {
        setBillAmount(billAmount - item.foodItem.price);
        return setItems(newItems.splice(index, 1));
      }
      setBillAmount(billAmount - item.foodItem.price);
      newItems[index].quantity--;
      return setItems(newItems);
    }
  }

  const submit = () => {
    console.log("submitting order");
    window.alert("Order Placed!");
    setBillAmount(0);
    setCount(0);
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, submit, billAmount, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
