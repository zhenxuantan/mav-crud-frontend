import { TextField, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordInput(props: {
  password: string;
  setPassword: Function;
  label: string;
}) {
  const { password, setPassword, label } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      variant="outlined"
      fullWidth
      sx={{ maxWidth: "20rem", width: "100vw" }}
      label={label}
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInput;
