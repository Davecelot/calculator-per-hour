import React from 'react';
import { Label } from './ui/label';
import { BrandSelect } from '@/components/brand/BrandSelect';

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
      <BrandSelect value={value} onValueChange={onChange}>
        <BrandSelect.Trigger
          id={id}
          aria-describedby={helpText ? `${id}-help` : undefined}
        >
          <BrandSelect.Value />
        </BrandSelect.Trigger>
        <BrandSelect.Content>
          {options.map((option) => (
            <BrandSelect.Item key={option.value} value={option.value}>
              {option.label}
            </BrandSelect.Item>
          ))}
        </BrandSelect.Content>
      </BrandSelect>
      {helpText && (
        <p id={`${id}-help`} className="text-xs text-[var(--muted)]">
          {helpText}
        </p>
      )}
    </div>
  );
}