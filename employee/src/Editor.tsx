import { DEPARTMENT, employee } from "./EmployeeCard";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography as Text,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { createEmpBackend, getIdEmpBackend, updateEmpBackend } from "./Backend";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  openSnackbarError,
  openSnackbarInfo,
  openSnackbarSuccess,
  State,
  updateEmployee,
} from "./redux/reduxSlice";

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
          if (response.status === 200) return response.data;
          throw new Error();
        })
        .then((result) => setEmployee(result))
        .catch((_error) => {
          dispatch(
            openSnackbarError("Employee not found, redirected to create page.")
          );
          nav("/create", { replace: true });
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
        .catch((error) => console.log("error", error));
    } else {
      updateEmpBackend(employee)
        .then((response) => {
          if (response.status === 200) {
            dispatch(openSnackbarSuccess("Successfully updated employee"));
            return response.data;
          } else if (response.status === 304) {
            dispatch(openSnackbarInfo("No change detected"));
            throw new Error("");
          }
          throw new Error("Error updating employee");
        })
        .then((result: employee) => {
          dispatch(updateEmployee(result));
          nav("/", { replace: true });
        })
        .catch(
          (error) =>
            String(error) === "" && dispatch(openSnackbarError(String(error)))
        );
    }
  }

  return (
    <Grid container mt={1} p={1} spacing={2} alignItems="center">
      <Grid
        item
        container
        direction="row"
        wrap="nowrap"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
          <Text variant="h5" color="primary">
            <b>
              {create ? "Enter new employee details" : "Edit employee details"}
            </b>
          </Text>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
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
      <Grid item xs={12} sm={4} mb="auto">
        <TextField
          fullWidth
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
      <Grid item xs={12} sm={2} mb="auto">
        <FormControl variant="standard" fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            fullWidth
            variant="standard"
            label="Department"
            value={employee.department}
            onChange={(event) =>
              setEmployee({
                ...employee,
                department: event.target.value as DEPARTMENT,
              })
            }
            sx={{ textAlign: "left" }}
          >
            <MenuItem value={DEPARTMENT.HR}>{DEPARTMENT.HR}</MenuItem>
            <MenuItem value={DEPARTMENT.PS}>{DEPARTMENT.PS}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item container xs={12} justifyContent="flex-end" spacing={2}>
        <Grid item>
          <ButtonGroup variant="contained">
            <BackButton
              endIcon={<ArrowBackIcon />}
              color="primary"
              variant="outlined"
              onClick={() => nav("/", { replace: true })}
            >
              Back
            </BackButton>
            <BackButton
              endIcon={<SaveIcon />}
              color="primary"
              onClick={handleSubmit}
              disabled={nameError() || salaryError()}
            >
              Submit
            </BackButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Editor;
