import React, { memo } from 'react';

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onClear: () => void;
}

const NumberPad: React.FC<NumberPadProps> = memo(({ onNumberClick, onClear }) => {
  return (
    <div className="number-pad">
      <div className="number-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            className="number-button"
            onClick={() => onNumberClick(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <button className="clear-button" onClick={onClear}>
        Очистить
      </button>
    </div>
  );
});

NumberPad.displayName = 'NumberPad';

export default NumberPad;
