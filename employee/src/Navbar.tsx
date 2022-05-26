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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "./redux/reduxSlice";

function Navbar() {
  const error = useSelector((state: State) => state.error);
  const loading = useSelector((state: State) => state.loading);
  const nav = useNavigate();
  const AddEmpButton = styled(Button)({
    textTransform: "none",
    backgroundColor: "#34933B",
    borderRadius: 0,
  });

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
        {error || (
          <>
            <AddEmpButton
              startIcon={<AddCircleOutlinedIcon />}
              color="success"
              variant="contained"
              sx={{ display: { sm: "flex", xs: "none" } }}
              onClick={() => nav("/create", { replace: true })}
            >
              Add Employee
            </AddEmpButton>
            <IconButton
              sx={{ display: { sm: "none", xs: "flex" }, width: "2rem" }}
              onClick={() => nav("/create", { replace: true })}
            >
              <AddCircleOutlinedIcon
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
