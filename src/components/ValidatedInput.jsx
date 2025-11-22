import React, { useState, useId } from 'react';

export default function ValidatedInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  type = 'number',
  required = false,
  helpText,
  id,
}) {
  const [error, setError] = useState('');
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const handleChange = (e) => {
    const newValue = type === 'number' ? Number(e.target.value) : e.target.value;

    // Validation
    if (required && !newValue) {
      setError('Required field');
    } else if (type === 'number' && min !== undefined && newValue < min) {
      setError(`Min value: ${min}`);
    } else if (type === 'number' && max !== undefined && newValue > max) {
      setError(`Max value: ${max}`);
    } else {
      setError('');
    }

    onChange(newValue);
  };

  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={`tech-input ${error ? 'border-red-500' : ''}`}
      />
      {error && <div className="text-red-500 text-xs font-mono mt-1">{error}</div>}
      {helpText && !error && <div className="text-xs text-textMuted mt-1 font-mono">{helpText}</div>}
    </div>
  );
}