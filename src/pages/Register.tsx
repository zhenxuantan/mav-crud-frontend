import { Grid, TextField, Typography as Text, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PasswordInput from "../parts/PasswordInput";
import {
  createUserBackend,
  getUserBackend,
  checkTokenBackend,
} from "../utils/backend";
import { openSnackbarError, openSnackbarSuccess } from "../utils/reduxSlice";
import { useDispatch } from "react-redux";
import DepartmentSelect from "../parts/DepartmentSelect";
import { DEPARTMENT } from "../parts/EmployeeCard";
import ProperCaseButton from "../parts/ProperCaseButton";

function Register() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [department, setDepartment] = useState(DEPARTMENT.HR);

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

  function registerError() {
    return (
      password !== confirmPw ||
      usernameError() ||
      password.length < 8 ||
      username.length < 4
    );
  }

  function errorMessage() {
    var msg = [];
    if (password.length < 8) msg.push("Password too short (minimum 8).");
    if (password !== confirmPw) msg.push("Entered passwords are not the same.");
    if (usernameError() || username.length < 4) msg.push("Username error.");
    return msg.join(" ");
  }

  function register(event: any) {
    event.preventDefault();
    if (registerError()) return;
    console.log(username);
    return getUserBackend(username)
      .then((response) => {
        if (response.status === 200)
          dispatch(openSnackbarError("Username used! Try another one."));
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 404) {
          return createUserBackend({
            username: username,
            password: password,
            department: department,
          })
            .then((response) => {
              if (response.status === 200) {
                dispatch(openSnackbarSuccess("Successfully registered!"));
                return nav("/", { replace: true });
              }
            })
            .catch((error) => console.log(error));
        }
        dispatch(openSnackbarError("Server error. Please try again."));
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
            label="Password (min. 8 characters)"
            autoComplete={false}
          />
        </Grid>
        <Grid item>
          <PasswordInput
            password={confirmPw}
            setPassword={setConfirmPw}
            label="Confirm Password"
            autoComplete={false}
          />
        </Grid>
        <Grid item>
          <DepartmentSelect state={department} setState={setDepartment} />
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
              color={"primary"}
              sx={{ maxWidth: "8rem", width: "100vw" }}
              onClick={() => nav("/login", { replace: true })}
              type="button"
            >
              Go to Login
            </ProperCaseButton>
          </Grid>
          <Grid item>
            <Tooltip title={errorMessage()}>
              <ProperCaseButton
                variant="contained"
                color={registerError() ? "error" : "primary"}
                sx={{ maxWidth: "8rem", width: "100vw" }}
                onClick={(event) => register(event)}
                type="submit"
              >
                Register
              </ProperCaseButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default Register;
