import { Grid, Typography as Text, Button } from "@mui/material";
import { useState } from "react";
import EmployeeCard, { employee } from "./EmployeeCard";
import { deleteEmpBackend } from "./Backend";
import { useDispatch } from "react-redux";
import Footer from "./Footer";
import { useNavigate } from "react-router";
import { openSnackbarError, openSnackbarSuccess } from "./redux/reduxSlice";

function Dashboard(props: {
  employees: employee[];
  setEmployees: Function;
  error: boolean;
}) {
  const nav = useNavigate();
  const { employees, setEmployees, error } = props;
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const deleteEmp = (id: number) => {
    setPage(
      Math.max(Math.min(Math.ceil((employees.length - 1) / 10) - 1, page), 0)
    );
    deleteEmpBackend(id)
      .then((response) => {
        if (response.status === 204) {
          dispatch(openSnackbarSuccess("Employee deleted"));
          return response.data;
        } else if (response.status === 404) {
          dispatch(openSnackbarError("Employee not found"));
          return "";
        }
        throw new Error();
      })
      .catch((_error) => dispatch(openSnackbarError("Server error")));
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <Grid container spacing={2} justifyContent="space-between" p={1} mt={1}>
      {error ? (
        <Grid
          container
          item
          direction="column"
          alignContent="center"
          alignItems="center"
          spacing={2}
          pt={2}
        >
          <Grid item>
            <Text variant="h5">
              <b>Server error, please reload.</b>
            </Text>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => nav(0)}>
              Reload
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>
          {employees.slice(page * 10, page * 10 + 10).map((emp: employee) => (
            <EmployeeCard emp={emp} deleteEmp={deleteEmp} key={emp.id} />
          ))}
          <Footer page={page} setPage={setPage} employees={employees} />
        </>
      )}
    </Grid>
  );
}

export default Dashboard;
