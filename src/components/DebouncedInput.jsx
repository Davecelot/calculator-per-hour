import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import ValidatedInput from './ValidatedInput';

export default function DebouncedInput({
  label,
  initialValue,
  onValueChange,
  min,
  max,
  step,
  type = 'number',
  required = false,
  helpText,
  debounceDelay = 300
}) {
  // Local state for immediate UI updates
  const [inputValue, setInputValue] = useState(initialValue);
  
  // Debounced value that will trigger calculations only after delay
  const debouncedValue = useDebounce(inputValue, debounceDelay);

  // Handle local state updates
  const handleChange = (newValue) => {
    setInputValue(newValue);
  };

  // Trigger the parent callback only when the debounced value changes
  useEffect(() => {
    onValueChange(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <ValidatedInput
      label={label}
      value={inputValue}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      type={type}
      required={required}
      helpText={helpText}
    />
  );
}