import { Grid, TextField, Typography as Text } from "@mui/material";
import { useEffect, useState } from "react";
import PasswordInput from "../parts/PasswordInput";
import { checkTokenBackend, loginUserBackend } from "../utils/backend";
import { openSnackbarError, openSnackbarSuccess } from "../utils/reduxSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProperCaseButton from "../parts/ProperCaseButton";

function Login() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(
    () => {
      checkTokenBackend()
        .then((_response) => nav("/", { replace: true }))
        .catch((error) => console.log(error));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function usernameError() {
    return !username.match("^[a-zA-Z0-9]*$") || username.length > 30;
  }

  function login(event: any) {
    event.preventDefault();
    return loginUserBackend({ username: username, password: password })
      .then((_response) => {
        console.log(_response);
        // window.localStorage.setItem("token", response.data.token);
        dispatch(openSnackbarSuccess("Successfully logged in."));
        nav("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403)
          return dispatch(openSnackbarError("Wrong password"));
        if (err.response.status === 404)
          return dispatch(openSnackbarError("User does not exist"));
        return dispatch(openSnackbarError("Server error. Please try again."));
      });
  }

  return (
    <form>
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
            autoComplete="on"
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
            autoComplete={true}
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
            <ProperCaseButton
              variant="outlined"
              color="primary"
              type="button"
              sx={{ maxWidth: "8rem", width: "100vw" }}
              onClick={() => nav("/register", { replace: true })}
            >
              Go to Register
            </ProperCaseButton>
          </Grid>
          <Grid item>
            <ProperCaseButton
              variant="contained"
              color="primary"
              sx={{ maxWidth: "8rem", width: "100vw" }}
              onClick={(event) => login(event)}
              type="submit"
            >
              Login
            </ProperCaseButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default Login;
