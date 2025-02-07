import React from 'react';
import { Form, Select, Input } from 'antd';
import styles from './reusable-fields.module.scss';

/* Select component from Ant Design */
const { Option } = Select;

/* Input type definition */
export type InputType = 'select' | 'input' | 'textarea';

/* Form field component props */
export interface FormFieldProps {
  type: InputType;
  numberOnly?: boolean;
  label: string;
  name: string;
  required?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  className?: string;
  rows?: number;
  suffixIcon?: React.ReactNode;
  error?: string;
}

/* Reusable form field component */
const FormField: React.FC<FormFieldProps> = ({
  type,
  numberOnly,
  label,
  name,
  required = false,
  value,
  onChange,
  onBlur,
  placeholder,
  options = [],
  className,
  rows = 4,
  suffixIcon,
  error,
}) => {
  /* Renders label with required indicator */
  const renderLabel = () => (
    <div className={styles.labelWrapper}>
      {label}
      {required && <span className={styles.requiredIndicator}>*</span>}
    </div>
  );

  /* Handles change events */
  const handleChange = (val: any) => {
    if (onChange) {
      const actualValue = val?.target?.value ?? val;
      onChange(actualValue);
    }
  };

  /* Renders different input types */
  const renderField = () => {
    switch (type) {
      case 'select':
        return (
          <Select
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            suffixIcon={suffixIcon}
            className={`${styles.customSelect} ${className}`}
            placeholder={placeholder}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );

      case 'textarea':
        return (
          <Input.TextArea
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            className={`${styles.customTextarea} ${className}`}
          />
        );

      case 'input':
      default:
        return (
          <Input
            type={numberOnly ? 'number' : 'text'}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`${styles.customInput} ${className}`}
          />
        );
    }
  };

  return (
    <Form.Item
      label={<span className={styles.inputLabel}>{renderLabel()}</span>}
      required={required}
      className={styles.formItems}
      validateStatus={error ? 'error' : ''}
      help={error}
    >
      {renderField()}
    </Form.Item>
  );
};

export default FormField;
