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

function App() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getAllEmpBackend()
      .then((result) => setEmployees(result.employees))
      .catch((error) => console.log("error", error));
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
