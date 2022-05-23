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
import { createEmpBackend, updateEmpBackend } from "./Backend";
import { openSnackbar } from "./redux/action";
import { useDispatch } from "react-redux";

function Editor(props: {
  create: boolean;
  employees: employee[];
  setEmployees: Function;
}) {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { create, employees, setEmployees } = props;
  const nav = useNavigate();
  const emptyEmployee: employee = {
    id: 0,
    name: "Please insert name here",
    salary: 0,
    department: DEPARTMENT.HR,
  };

  const [employee, setEmployee] = useState(emptyEmployee);

  useEffect(() => {
    if (create) return;
    const tempEmp = employees.find((e) => e.id.toString() === userId);
    if (tempEmp) return setEmployee(tempEmp);
    dispatch(
      openSnackbar("Employee not found, redirected to create page.", "error")
    );
    nav("/create", { replace: true });
  }, [create, employees, dispatch, nav, userId]);

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
            dispatch(openSnackbar("Successfully added employee", "success"));
            return response.json();
          }
          response.json().then((val) => {
            throw new Error(val.errorMessage);
          });
        })
        .then((result: employee) => {
          setEmployees([...employees, result]);
          nav("/", { replace: true });
        })
        .catch((error) => console.log("error", error));
    } else {
      updateEmpBackend(employee)
        .then((response) => {
          if (response.status === 200) {
            dispatch(openSnackbar("Successfully updated employee", "success"));
            return response.json();
          } else if (response.status === 304) {
            dispatch(openSnackbar("No change detected", "info"));
            throw new Error("");
          }
          throw new Error("Error updating employee");
        })
        .then((result: employee) => {
          setEmployees(
            employees.map((emp) =>
              emp.id.toString() === userId ? result : emp
            )
          );
          nav("/", { replace: true });
        })
        .catch(
          (error) =>
            String(error) === "" &&
            dispatch(openSnackbar(String(error), "error"))
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
          error={nameError()}
          value={employee.name}
          onChange={(event) =>
            setEmployee({ ...employee, name: event.target.value })
          }
          helperText={
            nameError() &&
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
          value={employee.salary}
          onChange={(event) =>
            setEmployee({ ...employee, salary: +event.target.value })
          }
          helperText={
            salaryError() &&
            "Please ensure that the salary is positive and within 2 billion."
          }
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
