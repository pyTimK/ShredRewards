import { MouseEventHandler, ReactNode } from "react";
import { baseColors } from "../classes/Constants";
import styles from "../styles/MyButton.module.css";
import SizedBox from "./SizedBox";

interface MyButtonProps {
  label: string;
  icon?: ReactNode;
  backgroundColor?: baseColors;
  color?: baseColors;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const MyButton: React.FC<MyButtonProps> = ({
  icon,
  label,
  backgroundColor,
  color,
  onClick,
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: `var(--${backgroundColor})`,
        color: `var(--${color})`,
      }}
      onClick={onClick}
    >
      {icon}
      <SizedBox width={10} />
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default MyButton;
