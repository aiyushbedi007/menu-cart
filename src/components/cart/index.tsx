import { useEffect, useRef, useState } from "react";
import { Button } from "../button/Button";
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
  const flyoutRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside({
    ref: flyoutRef,
    handler: () => setIsOpen(false),
    captureClicks: false,
    clickCaptureIgnore: [triggerRef],
  });

  const { items: cartItems, updateQuantity, submit, billAmount, count } = useCart();

  useEffect(() => {
    setItems(cartItems);
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
        <Button className={styles.order} onClick={() => submit()}>{`Place Order $ ${billAmount}`}</Button>
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
        <span className={styles.price}>$ {cartItem.foodItem.price}</span>
      </div>
      <div className={styles.buttonFlex}>
        {cartItem.quantity === 1 ? (
          <ThrashIcon onClick={() => updateQuantity(cartItem, "decrease")} />
        ) : (
          <MinusIcon onClick={() => updateQuantity(cartItem, "decrease")} />
        )}
        <span>{cartItem.quantity}</span>
        <PlusIcon onClick={() => updateQuantity(cartItem, "increase")} />
      </div>
    </div>
  );
};