import { CssBaseline, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Editor from "./Editor";
import { Route, Routes } from "react-router";
import { getAllEmpBackend } from "./Backend";
import ErrorPage from "./ErrorPage";
import SnackBar from "./Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbarError, State } from "./redux/reduxSlice";

function App() {
  const dispatch = useDispatch();
  // const employees = useSelector((state: State) => state.employees);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    getAllEmpBackend()
      .then((response) => {
        if (response.status === 200) return response.data;
        throw new Error();
      })
      .then((result) => {
        setError(false);
        setEmployees(result.employees);
      })
      .catch((_error) => {
        setError(true);
        dispatch(openSnackbarError("Server error."));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees.length]);

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
        <Navbar error={error} />
        <SnackBar />
        <div>
          <Container maxWidth="lg">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    employees={employees}
                    setEmployees={setEmployees}
                    error={error}
                  />
                }
              />
              <Route
                path="/create"
                element={
                  <Editor
                    create={true}
                    employees={employees}
                    setEmployees={setEmployees}
                  />
                }
              />
              <Route
                path="/update/:userId"
                element={
                  <Editor
                    create={false}
                    employees={employees}
                    setEmployees={setEmployees}
                  />
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
