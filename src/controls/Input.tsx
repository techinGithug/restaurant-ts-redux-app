import React from "react";
import { OutlinedInputProps, TextField } from "@material-ui/core";

interface InputProps {
  name?: string;
  label?: string;
  value?: any;
  onChange?: any;
  error?: any;
  disabled?: boolean;
  InputProps?: Partial<OutlinedInputProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  error = null,
  value,
  onChange,
  disabled,
  InputProps,
}) => {
  return (
    <TextField
      InputProps={InputProps}
      disabled={disabled}
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
