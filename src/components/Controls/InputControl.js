import { TextField } from "@material-ui/core";
import React from "react";

export default function InputControl({
  label,
  value,
  name,
  onChange,
  error = null,
  ...rest
}) {
  console.log("Error:",error);
  return (
    <div>
      <TextField
        variant="outlined"
        label={label}
        value={value}
        name={name}
        onChange={onChange}
        {...rest}
        {...(error && { error: true, helperText: error })}  // it sets the Error Message fron here i.e helperText
      />
    </div>
  );
}
