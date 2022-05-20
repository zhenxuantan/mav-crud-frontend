import { Snackbar, AlertColor } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./redux/action";
import { snackbarState } from "./redux/reducers";
import MuiAlert from "@mui/material/Alert";

function SnackBar() {
  const dispatch = useDispatch();
  const SHOW = useSelector((state: snackbarState) => state.toggleSnackbar);
  const MESSAGE = useSelector((state: snackbarState) => state.message);
  const SEVERITY = useSelector((state: snackbarState) => state.severity);
  function handleClose() {
    dispatch(closeSnackbar());
  }
  return (
    <Snackbar open={SHOW} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={SEVERITY as AlertColor}
        sx={{ width: "100%" }}
      >
        {MESSAGE}
      </MuiAlert>
    </Snackbar>
  );
}

export default SnackBar;
