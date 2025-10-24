import React, { memo } from 'react';
import styles from './NumberPad.module.css';

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onClear: () => void;
}

const NumberPad: React.FC<NumberPadProps> = memo(({ onNumberClick, onClear }) => {
  return (
    <div className={styles.pad}>
      <div className={styles.buttons}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            className={styles.button}
            onClick={() => onNumberClick(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <button className={styles.clearButton} onClick={onClear}>
        Очистить
      </button>
    </div>
  );
});

NumberPad.displayName = 'NumberPad';

export default NumberPad;
