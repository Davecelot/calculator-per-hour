import React from 'react';
import { Label } from './ui/label';
import { Select } from './ui/select';

export default function AccessibleSelect({
  label,
  id,
  value,
  onChange,
  options,
  helpText,
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={helpText ? `${id}-help` : undefined}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {helpText && (
        <p id={`${id}-help`} className="text-xs text-[var(--muted)]">
          {helpText}
        </p>
      )}
    </div>
  );
}