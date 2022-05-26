import { CssBaseline, Container } from "@mui/material";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Editor from "./Editor";
import { Route, Routes } from "react-router";
import { getAllEmpBackend } from "./Backend";
import ErrorPage from "./ErrorPage";
import SnackBar from "./Snackbar";
import { useDispatch } from "react-redux";
import {
  errorPage,
  openSnackbarError,
  setEmployees,
  setLoading,
} from "./redux/reduxSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllEmpBackend()
      .then((response) => {
        if (response.status === 200) return response.data;
        throw new Error();
      })
      .then((result) => {
        dispatch(setEmployees(result.employees));
      })
      .catch((_error) => {
        dispatch(errorPage());
        dispatch(openSnackbarError("Server error."));
      })
      .finally(() => dispatch(setLoading(false)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Navbar />
        <SnackBar />
        <div>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<Editor create={true} />} />
              <Route
                path="/update/:userId"
                element={<Editor create={false} />}
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
