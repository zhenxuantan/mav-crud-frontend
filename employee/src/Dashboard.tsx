import { Typography as Text, Grid, Button } from "@mui/material";
import React, { useState } from "react";
import EmployeeCard, { employee } from "./EmployeeCard";
import { styled } from "@mui/material/styles";
import { deleteEmpBackend } from "./Backend";
import { openSnackbar } from "./redux/action";
import { useDispatch } from "react-redux";

function Dashboard(props: { employees: employee[]; setEmployees: Function }) {
  const { employees, setEmployees } = props;
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const PageButton = styled(Button)({
    textTransform: "none",
    fontSize: "1rem",
    minWidth: 0,
    "&:hover": {
      backgroundColor: "#E1E1E1",
      textDecoration: "underline",
    },
  });

  const deleteEmp = (id: number) => {
    setPage(
      Math.max(Math.min(Math.ceil((employees.length - 1) / 10) - 1, page), 0)
    );
    deleteEmpBackend(id)
      .then((response) => {
        if (response.status === 204) {
          dispatch(openSnackbar("Employee deleted", "success"));
          return response.text();
        } else if (response.status === 404) {
          dispatch(openSnackbar("Employee not found", "error"));
          return "";
        }
        throw new Error();
      })
      .then((result) => console.log(result))
      .catch((_error) => dispatch(openSnackbar("Server error", "error")));
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <Grid container spacing={2} justifyContent="space-between" p={1} mt={1}>
      {employees.slice(page * 10, page * 10 + 10).map((emp: employee) => (
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={6}
          key={emp.id}
          alignItems="center"
          justifyContent="center"
        >
          <EmployeeCard emp={emp} deleteEmp={deleteEmp} />
        </Grid>
      ))}
      <Grid container mt={2} justifyContent="space-between" wrap="nowrap">
        <Grid
          item
          xs="auto"
          sx={{ display: { sm: "flex", xs: "none" } }}
          alignItems="center"
        >
          <Text variant="body1" align="left" color="primary">
            Showing{" "}
            <b>
              {page * 10 + 1}-{Math.min(page * 10 + 10, employees.length)}
            </b>{" "}
            out of <b>{employees.length}</b> entries
          </Text>
        </Grid>
        {employees.length > 10 && (
          <Grid
            item
            container
            xs="auto"
            alignItems="center"
            spacing={2}
            ml="auto"
          >
            <Grid item>
              <PageButton
                color="primary"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </PageButton>
            </Grid>
            <Grid item>
              <Text sx={{ fontSize: "1rem" }} color="primary">
                <b>{page + 1}</b>
              </Text>
            </Grid>
            <Grid item>
              <PageButton
                color="primary"
                disabled={page === Math.ceil(employees.length / 10) - 1}
                onClick={() => setPage(page + 1)}
              >
                Next
              </PageButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
