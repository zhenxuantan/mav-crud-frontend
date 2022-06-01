import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DEPARTMENT, employee } from "./EmployeeCard";

function DepartmentSelect(props: {
  state: employee | string;
  setState: Function;
}) {
  const { state, setState } = props;
  return (
    <FormControl variant="standard" sx={{ maxWidth: "20rem", width: "100vw" }}>
      <InputLabel>Department</InputLabel>
      <Select
        fullWidth
        variant="standard"
        label="Department"
        value={typeof state == "string" ? state : state.department}
        onChange={(event) =>
          typeof state == "string"
            ? setState(event.target.value)
            : setState({
                ...state,
                department: event.target.value as DEPARTMENT,
              })
        }
        sx={{ textAlign: "left" }}
      >
        <MenuItem value={DEPARTMENT.HR}>{DEPARTMENT.HR}</MenuItem>
        <MenuItem value={DEPARTMENT.PS}>{DEPARTMENT.PS}</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DepartmentSelect;
