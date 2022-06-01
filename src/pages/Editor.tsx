import { DEPARTMENT, employee } from "../parts/EmployeeCard";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  styled,
  TextField,
  Typography as Text,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import {
  createEmpBackend,
  getIdEmpBackend,
  updateEmpBackend,
} from "../utils/backend";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  openSnackbarError,
  openSnackbarInfo,
  openSnackbarSuccess,
  State,
  updateEmployee,
} from "../utils/reduxSlice";
import DepartmentSelect from "../parts/DepartmentSelect";

function Editor(props: { create: boolean }) {
  const { create } = props;
  const { userId } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state: State) => state.employees);
  const emptyEmployee: employee = {
    id: 0,
    name: "",
    salary: 0,
    department: DEPARTMENT.HR,
  };

  const [employee, setEmployee] = useState(emptyEmployee);

  useEffect(() => {
    if (create) return setEmployee(emptyEmployee);
    userId &&
      getIdEmpBackend(+userId)
        .then((response) => {
          return response.data;
        })
        .then((result) => setEmployee(result))
        .catch((error) => {
          if (error.response.status === 403) {
            nav("/login", { replace: true });
            return dispatch(openSnackbarError("Need to login"));
          } else if (error.response.status === 404) {
            dispatch(
              openSnackbarError(
                "Employee not found, redirected to create page."
              )
            );
            return nav("/create", { replace: true });
          }
          dispatch(openSnackbarError("Server error"));
          nav("/", { replace: true });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [create, dispatch, employees, nav, userId]);

  const BackButton = styled(Button)({
    textTransform: "none",
  });

  function nameError() {
    return (
      !employee.name.match("^[\\w\\-\\s]+$") ||
      employee.name.length < 4 ||
      employee.name.length > 30
    );
  }

  function salaryError() {
    return employee.salary < 0 || employee.salary > 2000000000;
  }

  function handleSubmit() {
    employee.salary = Math.round(employee.salary);
    if (create) {
      createEmpBackend(employee)
        .then((response) => {
          if (response.status === 200) {
            dispatch(openSnackbarSuccess("Successfully added employee"));
            return response.data;
          }
          response.data.then((val: { errorMessage: string | undefined }) => {
            throw new Error(val.errorMessage);
          });
        })
        .then((result: employee) => {
          dispatch(addEmployee(result));
          nav("/", { replace: true });
        })
        .catch((error) => {
          if (error.response.status === 403) {
            nav("/login", { replace: true });
            return dispatch(openSnackbarError("Need to login"));
          }
          dispatch(openSnackbarError("Server error"));
          nav("/", { replace: true });
        });
    } else {
      updateEmpBackend(employee)
        .then((response) => {
          dispatch(
            response.status === 200
              ? openSnackbarSuccess("Successfully updated employee")
              : openSnackbarInfo("No change detected")
          );
          return response.data;
        })
        .then((result: employee) => {
          dispatch(updateEmployee(result));
          nav("/", { replace: true });
        })
        .catch((error) => {
          if (error.response.status === 403) {
            nav("/login", { replace: true });
            return dispatch(openSnackbarError("Need to login"));
          }
          dispatch(openSnackbarError("Server error"));
          nav("/", { replace: true });
        });
    }
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
          <b>
            {create ? "Enter new employee details" : "Edit employee details"}
          </b>
        </Text>
      </Grid>
      <Grid item>
        <TextField
          sx={{ maxWidth: "20rem", width: "100vw" }}
          autoFocus
          variant="standard"
          label="Name (4 - 30 characters)"
          value={employee.name}
          onChange={(event) =>
            setEmployee({ ...employee, name: event.target.value })
          }
          helperText={
            "Please ensure that the name is within the character limit and that there are no special characters."
          }
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{ maxWidth: "20rem", width: "100vw" }}
          variant="standard"
          label="Salary"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          error={salaryError()}
          value={employee.salary.toString()}
          onChange={(event) =>
            setEmployee({ ...employee, salary: parseInt(event.target.value) })
          }
          helperText={salaryError() && "Please enter a valid salary."}
        />
      </Grid>
      <Grid item>
        <DepartmentSelect state={employee} setState={setEmployee} />
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
          <BackButton
            endIcon={<ArrowBackIcon />}
            color="primary"
            variant="outlined"
            onClick={() => nav("/", { replace: true })}
          >
            Back
          </BackButton>
        </Grid>
        <Grid item>
          <BackButton
            endIcon={<SaveIcon />}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={nameError() || salaryError()}
          >
            Submit
          </BackButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Editor;
