// types/dynamic-form.ts
export type InputType = 
  | 'text' 
  | 'number'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'color'
  | 'range'
  | 'file';

export interface FormFieldConfig {
  id: string;
  label: string;
  type: InputType;
  options?: { value: string; label: string }[]; // Para select, radio, checkbox
  defaultValue?: any;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number; // Para number, range
  multiple?: boolean; // Para file
  accept?: string; // Para file
  validationMessage?: string;
  placeholder?: string;
  rows?: number; // Para textarea
  disabled?: boolean;
  className?: string;
}

export interface FormConfig {
  fields: FormFieldConfig[];
}

export interface FormValues {
  [key: string]: any;
}