import { Grid, Typography as Text, Button } from "@mui/material";
import EmployeeCard, { employee } from "../parts/EmployeeCard";
import { deleteEmpBackend, getAllEmpBackend } from "../utils/backend";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../parts/Footer";
import { useNavigate } from "react-router";
import {
  deleteEmployee,
  openSnackbarError,
  openSnackbarSuccess,
  setEmployees,
  setLoading,
  setPage,
  State,
} from "../utils/reduxSlice";
import { useEffect, useState } from "react";

function Dashboard() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const employees = useSelector((state: State) => state.employees);
  const page = useSelector((state: State) => state.page);

  const init = () => {
    dispatch(setLoading(true));
    getAllEmpBackend()
      .then((response) => {
        if (response.status === 200) return response.data;
        throw new Error();
      })
      .then((result) => {
        setError(false);
        dispatch(setEmployees(result.employees));
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          nav("/login", { replace: true });
          return dispatch(openSnackbarError("Need to login"));
        }
        setError(true);
        dispatch(openSnackbarError("Server error."));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(init, []);

  const deleteEmp = (id: number) => {
    dispatch(
      setPage(
        Math.max(Math.min(Math.ceil((employees.length - 1) / 10) - 1, page), 0)
      )
    );
    deleteEmpBackend(id)
      .then((response) => {
        dispatch(openSnackbarSuccess("Employee deleted"));
        return response.data;
      })
      .catch((error) => {
        if (error.response.status === 403) {
          nav("/login", { replace: true });
          return dispatch(openSnackbarError("Need to login"));
        } else if (error.response.status === 404) {
          dispatch(openSnackbarError("Employee not found"));
          return "";
        }
        dispatch(openSnackbarError("Server error"));
      });
    dispatch(deleteEmployee(id));
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
            <Button variant="contained" onClick={init}>
              Reload
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>
          {employees.slice(page * 10, page * 10 + 10).map((emp: employee) => (
            <EmployeeCard emp={emp} deleteEmp={deleteEmp} key={emp.id} />
          ))}
          <Footer />
        </>
      )}
    </Grid>
  );
}

export default Dashboard;
