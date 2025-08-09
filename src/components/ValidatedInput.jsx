import React, { useState } from 'react';

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
}) {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const newValue = type === 'number' ? Number(e.target.value) : e.target.value;
    
    // Validation
    if (required && !newValue) {
      setError('Este campo es obligatorio');
    } else if (type === 'number' && min !== undefined && newValue < min) {
      setError(`El valor mínimo es ${min}`);
    } else if (type === 'number' && max !== undefined && newValue > max) {
      setError(`El valor máximo es ${max}`);
    } else {
      setError('');
    }
    
    onChange(newValue);
  };

  return (
    <div className="input-group">
      <label className="text-xs muted">{label}</label>
      <input
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={error ? 'error' : ''}
      />
      {error && <div className="error-text text-xs">{error}</div>}
      {helpText && !error && <div className="muted small mt-1">{helpText}</div>}
    </div>
  );
}