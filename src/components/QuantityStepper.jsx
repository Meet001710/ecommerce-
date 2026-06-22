export default function QuantityStepper({ value, onChange, min = 1, max = 999 }) {
  const v = Number(value) || 0;

  function dec() {
    onChange(Math.max(min, v - 1));
  }
  function inc() {
    onChange(Math.min(max, v + 1));
  }

  return (
    <div className="stepper">
      <button type="button" className="step-btn" onClick={dec} aria-label="Decrease">
        -
      </button>
      <input
        className="step-input"
        value={v}
        onChange={(e) => onChange(e.target.value)}
        inputMode="numeric"
      />
      <button type="button" className="step-btn" onClick={inc} aria-label="Increase">
        +
      </button>
    </div>
  );
}

