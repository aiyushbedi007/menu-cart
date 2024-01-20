import { useEffect, useRef, useState } from "react";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import { ReactComponent as MinusIcon } from "../../assets/minus.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as ThrashIcon } from "../../assets/trash.svg";
import styles from "./Cart.module.css";
import { cls } from "../../utils";
import { useOnClickOutside } from "../../hooks/use-onclick-outside";
import { useCart, CartItem } from "../../contexts/CartContext";

type CartProps = {};

export function Cart(props: CartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [count, setCount] = useState(0);

  const flyoutRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside({
    ref: flyoutRef,
    handler: () => setIsOpen(false),
    captureClicks: false,
    clickCaptureIgnore: [triggerRef],
  });

  const { items: cartItems, updateQuantity, submit, billAmount } = useCart();

  useEffect(() => {
    setItems(cartItems);
    setCount(cartItems.length);
  }, [cartItems]);

  return (
    <div style={{ position: "relative" }}>
      <button
        className={styles.button}
        disabled={!count}
        onClick={() => setIsOpen((state) => !state)}
        ref={triggerRef}
      >
        <CartIcon />
        <p>{count}</p>
      </button>
      <div
        ref={flyoutRef}
        className={cls(styles.flyout, !isOpen && styles.closed)}
      >
        {count ? (
          items?.map((item) => <CartCard cartItem={item} updateQuantity={updateQuantity} />)
        ) : (
          <p>Your order is empty</p>
        )}
        <button onClick={() => submit()}><span>Place Order</span><span>$ {billAmount}</span></button>
      </div>
    </div>
  );
}

const CartCard = ({
  cartItem,
  updateQuantity,
}: {
  cartItem: CartItem;
  updateQuantity: (item: CartItem, operation: string) => void;
}) => {
  return (
    <div className={styles.item}>
      {cartItem.foodItem.imgUrl ? (
        <img src={cartItem.foodItem.imgUrl} className={styles.image} alt={cartItem.foodItem.name} />
      ) : (
        <div className={styles.image} />
      )}
      <div className={styles.right}>
        <span className={styles.title}>{cartItem.foodItem.name}</span>
        <span className={styles.description}>{cartItem.foodItem.description}</span>
        <span className={styles.price}>{cartItem.foodItem.price}</span>
      </div>
      <div className={styles.buttonFlex}>
        {cartItem.quantity === 1 ? (
          <button
            onClick={() => updateQuantity(cartItem, "decrease")}
          >
            <ThrashIcon />
          </button>
        ) : (
          <button
            onClick={() => updateQuantity(cartItem, "decrease")}
          >
            <MinusIcon />
          </button>
        )}
        <span>{cartItem.quantity}</span>

        <button
          onClick={() => updateQuantity(cartItem, "decrease")}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};