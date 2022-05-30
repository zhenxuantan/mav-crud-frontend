import {
  Grid,
  Button,
  TextField,
  Typography as Text,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordInput from "../parts/PasswordInput";
import PasswordStrengthBar from "react-password-strength-bar";

function Register() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [score, setScore] = useState(0);

  function usernameError() {
    return !username.match("^[a-zA-Z0-9]*$") || username.length > 30;
  }

  function registerError() {
    return (
      password !== confirmPw ||
      usernameError() ||
      score < 2 ||
      username.length < 4
    );
  }

  function errorMessage() {
    var msg = [];
    if (score < 2) msg.push("Password too weak.");
    if (password !== confirmPw) msg.push("Entered passwords are not the same.");
    if (usernameError() || username.length < 4) msg.push("Username error.");
    return msg.join(" ");
  }

  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      alignItems="center"
      spacing={2}
      pt={2}
    >
      <Grid item>
        <Text variant="h5" color="primary">
          <b>Register</b>
        </Text>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          sx={{ maxWidth: "20rem", width: "100vw" }}
          label="Username (4 - 30 characters)"
          error={usernameError()}
          helperText="Only alphanumeric characters allowed."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Grid>
      <Grid item>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          label="Password"
        />
        <PasswordStrengthBar
          password={password}
          onChangeScore={(s, f) => setScore(s)}
        />
      </Grid>
      <Grid item>
        <PasswordInput
          password={confirmPw}
          setPassword={setConfirmPw}
          label="Confirm Password"
        />
      </Grid>
      <Grid item>
        <Tooltip title={errorMessage()}>
          <Button
            variant="contained"
            color={registerError() ? "error" : "primary"}
            sx={{ maxWidth: "20rem", width: "100vw" }}
            onClick={() => registerError() || nav("/", { replace: true })}
          >
            Register
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default Register;
