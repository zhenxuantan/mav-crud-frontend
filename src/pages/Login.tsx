import { Grid, Button, TextField, Typography as Text } from "@mui/material";
import { useEffect, useState } from "react";
import PasswordInput from "../parts/PasswordInput";
import { checkTokenBackend, loginUserBackend } from "../utils/backend";
import { openSnackbarError, openSnackbarSuccess } from "../utils/reduxSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(
    () => {
      checkTokenBackend()
        .then((_response) => nav("/", { replace: true }))
        .catch((_error) => null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function usernameError() {
    return !username.match("^[a-zA-Z0-9]*$") || username.length > 30;
  }

  function login() {
    return loginUserBackend({ username: username, password: password })
      .then((response) => {
        window.localStorage.setItem("token", response.data.token);
        dispatch(openSnackbarSuccess("Successfully logged in."));
        nav("/", { replace: true });
      })
      .catch((err) => {
        if (err.response.status === 403)
          return dispatch(openSnackbarError("Wrong password"));
        if (err.response.status === 404)
          return dispatch(openSnackbarError("User does not exist"));
        return dispatch(openSnackbarError("Server error. Please try again."));
      });
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
          <b>Login</b>
        </Text>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          sx={{ maxWidth: "20rem", width: "100vw" }}
          label="Username"
          error={usernameError()}
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
      </Grid>
      <Grid
        container
        item
        direction="row"
        sx={{ maxWidth: "20rem", width: "100vw" }}
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
          <Button
            variant="contained"
            color={"primary"}
            sx={{ maxWidth: "8rem", width: "100vw" }}
            onClick={() => nav("/register", { replace: true })}
          >
            To Register
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color={"primary"}
            sx={{ maxWidth: "8rem", width: "100vw" }}
            onClick={login}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
