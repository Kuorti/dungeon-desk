import { ButtonHTMLAttributes, ReactNode } from "react";
import { Size } from "@src/shared/types/size.ts";
import styles from "./button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: Size;
}

const sizeClassMap: Record<Size, string> = {
  xs: styles["button--xs"],
  s: styles["button--s"],
  m: styles["button--m"],
  l: styles["button--l"],
};

const Button = ({ size = "m", className = "", children, ...props }: Props) => {
  const classes = [styles.button, sizeClassMap[size], className].join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
