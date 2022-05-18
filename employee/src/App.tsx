import { CssBaseline, Container } from "@mui/material";
import { useState } from "react";
import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SAMPLE_EMPLOYEES } from "./SampleData";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Editor from "./Editor";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [employees, setEmployees] = useState(SAMPLE_EMPLOYEES);

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
        <div className="App">
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
            </Routes>
          </Container>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
