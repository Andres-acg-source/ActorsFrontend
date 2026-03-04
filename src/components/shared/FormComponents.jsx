import { useState } from 'react'

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  error = null,
  placeholder = '',
  ariaLabel = ''
}) {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={ariaLabel || label}
        className={error ? 'input-error' : ''}
        required={required}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error = null,
  ariaLabel = ''
}) {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel || label}
        className={error ? 'input-error' : ''}
        required={required}
      >
        <option value="">Selecciona...</option>
        {options.map(opt => (
          <option key={opt.id || opt.value} value={opt.id || opt.value}>
            {opt.label || opt.name}
          </option>
        ))}
      </select>
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}

export function FormTextarea({
  label,
  name,
  value,
  onChange,
  required = false,
  error = null,
  placeholder = '',
  ariaLabel = ''
}) {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={ariaLabel || label}
        className={error ? 'input-error' : ''}
        required={required}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}

export function FormButton({
  label,
  type = 'submit',
  onClick = null,
  className = 'submit-btn',
  disabled = false,
  ariaLabel = ''
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  )
}
