import { cls } from "../../utils";
import styles from "./Button.module.css";

// Doesn't extend button props, even though it takes rest props
type ButtonProps = {
  children: string;
  className?: string;
  onClick?: () => void;
};

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button className={cls(className, styles.root)} {...rest}>
      {children}
    </button>
  );
}
