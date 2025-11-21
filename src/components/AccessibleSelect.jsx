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
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          aria-describedby={helpText ? `${id}-help` : undefined}
          className="tech-input appearance-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-textMuted">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
      {helpText && (
        <div id={`${id}-help`} className="text-xs text-textMuted mt-1 font-mono">
          {helpText}
        </div>
      )}
    </div>
  );
}