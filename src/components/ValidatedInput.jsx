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
<<<<<<< HEAD
    // Preserve the raw string value for validation so that values like "0"
    // don't get treated as falsy when checking the required constraint.
    const rawValue = e.target.value;
    const newValue = type === 'number' ? Number(rawValue) : rawValue;

    // Validation
    if (required && rawValue === '') {
      // A value is required and the input is empty
      setError('Este campo es obligatorio');
=======
    const newValue = type === 'number' ? Number(e.target.value) : e.target.value;

    // Validation
    if (required && !newValue) {
      setError('Required field');
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)
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
<<<<<<< HEAD
    <div className="space-y-1">
      <Label htmlFor={inputId}>{label}</Label>
      <BrandInput
        id={inputId}
=======
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
<<<<<<< HEAD
        className={error ? 'border-[var(--bad)]' : ''}
        aria-describedby={helpText ? `${inputId}-help` : undefined}
      />
      {error && <p className="text-xs text-[var(--bad)]">{error}</p>}
      {helpText && !error && (
        <p id={`${inputId}-help`} className="text-xs text-[var(--muted)]">
          {helpText}
        </p>
      )}
=======
        className={`tech-input ${error ? 'border-red-500' : ''}`}
      />
      {error && <div className="text-red-500 text-xs font-mono mt-1">{error}</div>}
      {helpText && !error && <div className="text-xs text-textMuted mt-1 font-mono">{helpText}</div>}
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)
    </div>
  );
}