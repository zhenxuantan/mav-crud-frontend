import {
  AppBar,
  Toolbar,
  Typography as Text,
  Button,
  IconButton,
  LinearProgress,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../utils/reduxSlice";
import { useLayoutEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutBackend } from "../utils/backend";

function Navbar() {
  const loading = useSelector((state: State) => state.loading);
  const [loggedIn, setLoggedIn] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const AddEmpButton = styled(Button)({
    textTransform: "none",
    backgroundColor: "#34933B",
    borderRadius: 0,
  });

  const LogoutButton = styled(Button)({
    textTransform: "none",
    borderRadius: 0,
  });
  useLayoutEffect(() => {
    setLoggedIn(
      loc.pathname === "/" ||
        loc.pathname.startsWith("/update/") ||
        loc.pathname === "/create"
    );
  }, [loc]);

  const handleLogout = () => {
    logoutBackend()
      .then((_response) => nav("/login", { replace: true }))
      .catch((error) => console.log(error));
  };

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
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
        {loggedIn && (
          <>
            <AddEmpButton
              startIcon={<AddCircleOutlinedIcon />}
              color="success"
              variant="contained"
              sx={{ display: { sm: "flex", xs: "none" } }}
              onClick={() => nav("/create", { replace: true })}
              disableElevation
            >
              Add Employee
            </AddEmpButton>
            <LogoutButton
              startIcon={<LogoutIcon />}
              variant="outlined"
              sx={{ display: { sm: "flex", xs: "none" }, marginLeft: 1 }}
              onClick={handleLogout}
              color="inherit"
            >
              Logout
            </LogoutButton>
            <IconButton
              sx={{ display: { sm: "none", xs: "flex" }, width: "2rem" }}
              onClick={() => nav("/create", { replace: true })}
            >
              <AddCircleOutlinedIcon
                sx={{ minWidth: "30px", minHeight: "30px", color: "white" }}
              />
            </IconButton>
            <IconButton
              sx={{
                display: { sm: "none", xs: "flex" },
                width: "2rem",
                marginLeft: 1,
              }}
              onClick={handleLogout}
            >
              <LogoutIcon
                sx={{ minWidth: "30px", minHeight: "30px", color: "white" }}
              />
            </IconButton>
          </>
        )}
      </Toolbar>
      {loading && <LinearProgress />}
    </AppBar>
  );
}

export default Navbar;
