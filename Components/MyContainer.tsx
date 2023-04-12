import { useEffect, useRef } from "react";
import styles from "../styles/MyContainer.module.css";
import { baseColors } from "../classes/Constants";

interface MyContainerProps {
  color?: baseColors;
}

const bottomOverflowOffsetPx = 8;

const MyContainer: React.FC<MyContainerProps> = ({
  children,
  color = "white",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && sourceRef.current && targetRef.current) {
      const sourceHeight = sourceRef.current.offsetHeight;
      const totalHeight = sourceHeight + bottomOverflowOffsetPx;
      targetRef.current.style.height = `${totalHeight}px`;
      wrapperRef.current.style.height = `${totalHeight}px`;
    }
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div
        className={styles.bottomOverflow}
        ref={targetRef}
        style={{ backgroundColor: `var(--${color})` }}
      />
      <div className={styles.main} ref={sourceRef}>
        {children}
      </div>
    </div>
  );
};

export default MyContainer;
