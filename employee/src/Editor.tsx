import { DEPARTMENT, employee } from "./EmployeeCard";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
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

function Editor(props: {
  create: boolean;
  employees: employee[];
  setEmployees: Function;
}) {
  const { userId } = useParams();
  const { create, employees, setEmployees } = props;
  const nav = useNavigate();
  const emptyEmployee: employee = {
    id: 0,
    name: "Please insert name here",
    salary: 0,
    department: DEPARTMENT.HR,
  };
  const [employee, setEmployee] = useState(
    userId
      ? employees.find((e) => e.id.toString() === userId) || emptyEmployee
      : emptyEmployee
  );

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
    return employee.salary < 0;
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
            "Please ensure that the salary is a positive number."
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
              onClick={() => {
                employee.salary = Math.round(employee.salary);
                setEmployees(
                  create
                    ? [...employees, employee]
                    : employees.map((emp) =>
                        emp.id.toString() === userId ? employee : emp
                      )
                );
                nav("/", { replace: true });
              }}
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
