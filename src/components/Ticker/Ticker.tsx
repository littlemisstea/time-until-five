import { memo } from "react";
import styles from "./Ticker.module.css";

interface TickerProps {
  value: number;
  label?: string;
}

const Ticker = memo(function Ticker({ value, label }: TickerProps) {
  if (value < 0) value = 0;

  return (
    <span className={styles.ticker}>
      <span
        className={styles.value}
        style={{ "--value": value } as React.CSSProperties}
        role="timer"
        aria-label={value.toString()}
      />
      {label && <span className={styles.label}>{label}</span>}
    </span>
  );
}, arePropsEqual);

function arePropsEqual(oldProps: TickerProps, newProps: TickerProps) {
  return oldProps.value === newProps.value && oldProps.label === newProps.label;
}

export default Ticker;
