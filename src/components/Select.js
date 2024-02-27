import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selected, theme) {
  return {
    fontWeight: selected.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    color: selected.includes(name) ? theme.palette.primary.main : theme.palette.text.primary,
  };
}

export default function SelectComponent({ options, label, setSelected, selected, disabled }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // Filter out duplicate names
    const uniqueNames = [...new Map(value.map((obj) => [obj.name, obj])).values()];
    
    // Keep only the last occurrence of each unique name
    const doNotRepeattValue = uniqueNames.filter((obj, index, self) => {
      return index === self.findIndex((o) => o.name === obj.name);
    });
    setSelected(doNotRepeattValue);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel>{label}</InputLabel>
        <Select
          disabled={disabled}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value, index) => (
                <Chip key={index} label={value.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((opt, index) => (
            <MenuItem
              key={index}
              value={opt}
              style={getStyles(opt, selected, theme)}
            >
              {opt.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
