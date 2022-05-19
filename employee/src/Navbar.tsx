import {
  AppBar,
  Toolbar,
  Typography as Text,
  Button,
  IconButton,
  Link,
} from "@mui/material";

import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
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
        <Link to="/create" component={RouterLink} underline="none">
          <AddEmpButton
            startIcon={<AddCircleOutlinedIcon />}
            color="success"
            variant="contained"
            sx={{ display: { sm: "flex", xs: "none" } }}
          >
            Add Employee
          </AddEmpButton>
        </Link>
        <IconButton
          sx={{ display: { sm: "none", xs: "flex" }, width: "2rem" }}
          component={RouterLink}
          to="/create"
        >
          <AddCircleOutlinedIcon
            sx={{ minWidth: "30px", minHeight: "30px", color: "white" }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
