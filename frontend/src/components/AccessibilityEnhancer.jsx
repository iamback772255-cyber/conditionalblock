/**
 * Accessibility Enhancer Component
 * Improves accessibility with ARIA labels and keyboard navigation
 */

import React from 'react';

export const AccessibleButton = ({ label, onClick, disabled = false, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      className="accessible-button"
      tabIndex={disabled ? -1 : 0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      {label}
    </button>
  );
};

export const AccessibleInput = ({
  label,
  value,
  onChange,
  type = 'text',
  ariaLabel,
  required = false,
  ...props
}) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={props.id} className="input-label">
        {label}
        {required && <span className="required" aria-label="required">*</span>}
      </label>
      <input
        id={props.id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel || label}
        aria-required={required}
        className="accessible-input"
        {...props}
      />
    </div>
  );
};

export const AccessibleSelect = ({
  label,
  value,
  onChange,
  options,
  ariaLabel,
  ...props
}) => {
  return (
    <div className="select-wrapper">
      <label htmlFor={props.id} className="select-label">
        {label}
      </label>
      <select
        id={props.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel || label}
        className="accessible-select"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default {
  AccessibleButton,
  AccessibleInput,
  AccessibleSelect,
};