import React from "react";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function TextInput({
  label,
  name,
  type,
  value,
  onChange,
  icon: Icon,
  positionStart = "start",
  positionEnd = "end",
  showPassword,
  setShowPassword,
}) {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type === "password" && showPassword ? "text" : type}
      onChange={onChange}
      value={value}
      InputProps={{
        startAdornment: Icon && (
          <InputAdornment position={positionStart}>
            <Icon size={20} />
          </InputAdornment>
        ),
        endAdornment:
          label !== "Email" ? (
            <InputAdornment position={positionEnd}>
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
}
