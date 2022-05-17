import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography as Text,
  Button,
  Grid,
  Container,
} from "@mui/material";
import React, { useState } from "react";
import "./App.css";
import EmployeeCard from "./EmployeeCard";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { EMPLOYEES } from "./SampleData";

function App() {
  const [page, setPage] = useState(0);

  const AddEmpButton = styled(Button)({
    textTransform: "none",
    backgroundColor: "#34933B",
    borderRadius: 0,
  });

  const PageButton = styled(Button)({
    textTransform: "none",
  });

  const deleteEmp = (id: number) => EMPLOYEES.filter((emp) => emp.id !== id);

  const theme = createTheme({
    typography: { fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif` },
    palette: {
      primary: {
        main: "#365271",
      },
    },
  });

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Text
              variant="h4"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                WebkitTextStroke: "1px black",
              }}
            >
              Employees
            </Text>
            <AddEmpButton
              startIcon={<AddCircleOutlinedIcon />}
              color="success"
              variant="contained"
            >
              Add Employee
            </AddEmpButton>
          </Toolbar>
        </AppBar>
        <div className="App">
          <Container maxWidth="lg">
            <Grid container spacing={2} p={2} justifyContent="space-around">
              {EMPLOYEES.slice(page * 10, page * 10 + 10).map((emp) => (
                <Grid item xs={12} sm={6}>
                  <EmployeeCard
                    key={emp.id}
                    name={emp.name}
                    dept={emp.department}
                    salary={emp.salary}
                    deleteEmp={deleteEmp}
                  />
                </Grid>
              ))}
              <Grid
                container
                mt={2}
                justifyContent="space-between"
                wrap="nowrap"
              >
                <Grid xs="auto">
                  <Text variant="body1" align="left" color="primary">
                    Showing{" "}
                    <b>
                      {page * 10 + 1}-
                      {Math.min(page * 10 + 10, EMPLOYEES.length)}
                    </b>{" "}
                    out of <b>{EMPLOYEES.length}</b> entries
                  </Text>
                </Grid>
                {EMPLOYEES.length > 10 && (
                  <Grid
                    item
                    container
                    xs="auto"
                    alignItems="center"
                    spacing={2}
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
                      <Text variant="body2" color="primary">
                        <b>{page + 1}</b>
                      </Text>
                    </Grid>
                    <Grid item>
                      <PageButton
                        color="primary"
                        disabled={page === Math.ceil(EMPLOYEES.length / 10) - 1}
                        onClick={() => setPage(page + 1)}
                      >
                        Next
                      </PageButton>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
