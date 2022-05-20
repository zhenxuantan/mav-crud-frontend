import { CssBaseline, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Editor from "./Editor";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { getAllEmpBackend } from "./Backend";
import NotFoundPage from "./NotFoundPage";
import SnackBar from "./Snackbar";
import { useDispatch } from "react-redux";
import { openSnackbar } from "./redux/action";

function App() {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getAllEmpBackend()
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error();
      })
      .then((result) => setEmployees(result.employees))
      .catch((_error) =>
        dispatch(openSnackbar("Error fetching employees", "error"))
      );
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
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Navbar />
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
