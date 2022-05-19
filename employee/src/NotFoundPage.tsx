import { Grid, Typography as Text, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const nav = useNavigate();
  return (
    <Grid container direction="column" alignContent="center" spacing={2} pt={2}>
      <Grid item>
        <Text variant="h4" color="primary">
          <b>Invalid site!</b>
        </Text>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => nav("/", { replace: true })}>
          Back to Dashboard
        </Button>
      </Grid>
    </Grid>
  );
}

export default NotFoundPage;
