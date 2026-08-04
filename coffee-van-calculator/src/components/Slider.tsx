import type { ChangeEvent } from "react";

interface SliderProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
  disabled?: boolean;
  help?: string;
}

export function Slider({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
  disabled = false,
  help,
}: SliderProps) {
  // React's onChange on a range input fires on every drag movement (the native
  // "input" event under the hood), so the readout and every downstream
  // computed value stay live on both input and change without extra wiring.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="slider-row" aria-disabled={disabled}>
      <div className="slider-row__top">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id} className="slider-row__value">
          {formatValue(value)}
        </output>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      {help && <p className="slider-row__help">{help}</p>}
    </div>
  );
}
