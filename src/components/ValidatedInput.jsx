import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

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
    // Preserve the raw string value for validation so that values like "0"
    // don't get treated as falsy when checking the required constraint.
    const rawValue = e.target.value;
    const newValue = type === 'number' ? Number(rawValue) : rawValue;

    // Validation
    if (required && rawValue === '') {
      // A value is required and the input is empty
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
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={error ? 'border-[var(--bad)]' : ''}
      />
      {error && <p className="text-xs text-[var(--bad)]">{error}</p>}
      {helpText && !error && <p className="text-xs text-[var(--muted)]">{helpText}</p>}
    </div>
  );
}