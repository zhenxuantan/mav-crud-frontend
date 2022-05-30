import { Snackbar, AlertColor } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../utils/reduxSlice";
import { State } from "../utils/reduxSlice";
import MuiAlert from "@mui/material/Alert";

function SnackBar() {
  const dispatch = useDispatch();
  const SHOW = useSelector((state: State) => state.toggleSnackbar);
  const MESSAGE = useSelector((state: State) => state.message);
  const SEVERITY = useSelector((state: State) => state.severity);
  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
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
