import styles from "./SkeletonLoader.module.css";
import { CSSProperties, ElementType } from "react";

export type SkeletonLoaderProps = {
  width?: string | number;
  height?: string | number;
  margin?: string | number;
  as?: ElementType;
  style?: Partial<CSSProperties>;
};

export const SkeletonLoader = ({
  width,
  height,
  margin,
  as = "div",
  style,
  ...rest
}: SkeletonLoaderProps) => {
  const Component = as;
  console.log({ Component });
  return (
    <Component
      className={styles.root}
      style={{
        width,
        height,
        margin,
        ...style,
      }}
      {...rest}
    />
  );
};
