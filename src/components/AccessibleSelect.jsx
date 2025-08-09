import React from 'react';

export default function AccessibleSelect({
  label,
  id,
  value,
  onChange,
  options,
  helpText,
}) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="text-xs muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        aria-describedby={helpText ? `${id}-help` : undefined}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && (
        <div id={`${id}-help`} className="muted small mt-1">
          {helpText}
        </div>
      )}
    </div>
  );
}