/* eslint-disable react/prop-types */

const FormField = ({
  labelName,
  className,
  placeholder,
  inputType,
  value,
  handleChange,
  isLoading,
  required,
}) => {
  return (
    <label className="form-field-label-wrapper">
      {labelName && <span className="form-field-label">{labelName}</span>}

      <input
        disabled={isLoading}
        required={required}
        spellCheck
        value={value}
        onChange={handleChange}
        type={inputType}
        placeholder={placeholder}
        className={`form-input ${className}`}
      />
    </label>
  );
};

export default FormField;
