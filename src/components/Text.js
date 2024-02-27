import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Text({ label, defaultValue, multiline, helperText, value, onChange, name, disabled}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          name={name}
          label={label}
          defaultValue={defaultValue}
          helperText={helperText}
          variant="outlined"
          rows={5}
          multiline={multiline}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </Box>
  );
}
