import React, { useState, useId } from 'react';
import { Label } from './ui/label';
import { BrandInput } from '@/components/brand/BrandInput';

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
      <Label htmlFor={inputId}>{label}</Label>
      <BrandInput
        id={inputId}
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={error ? 'border-[var(--bad)]' : ''}
        aria-describedby={helpText ? `${inputId}-help` : undefined}
      />
      {error && <p className="text-xs text-[var(--bad)]">{error}</p>}
      {helpText && !error && (
        <p id={`${inputId}-help`} className="text-xs text-[var(--muted)]">
          {helpText}
        </p>
      )}
    </div>
  );
}