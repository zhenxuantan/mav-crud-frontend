import { CssBaseline, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as PAGES from "./pages";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import SnackBar from "./parts/Snackbar";
import Navbar from "./parts/Navbar";
import { useLayoutEffect } from "react";
import { checkTokenBackend } from "./utils/backend";
import { useDispatch } from "react-redux";
import { openSnackbarError } from "./utils/reduxSlice";

function App() {
  const loc = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const theme = createTheme({
    typography: { fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif` },
    palette: {
      primary: {
        main: "#365271",
      },
    },
  });

  useLayoutEffect(() => {
    const auth = loc.pathname === "/login" || loc.pathname === "/register";
    checkTokenBackend()
      .then((_response) => auth && nav("/", { replace: true }))
      .catch((_error) => {
        !auth && nav("/login", { replace: true });
        !auth && dispatch(openSnackbarError("Need log in"));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Navbar />
        <SnackBar />
        <div>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/login" element={<PAGES.Login />} />
              <Route path="/register" element={<PAGES.Register />} />
              <Route path="/" element={<PAGES.Dashboard />} />
              <Route path="/create" element={<PAGES.Editor create={true} />} />
              <Route
                path="/update/:userId"
                element={<PAGES.Editor create={false} />}
              />

              <Route path="*" element={<PAGES.ErrorPage />} />
            </Routes>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
