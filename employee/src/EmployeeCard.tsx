import {
  Card,
  Grid,
  Button,
  IconButton,
  styled,
  Typography as Text,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EmployeeCard(props: {
  name: string;
  dept: string;
  salary: number;
  deleteEmp: Function;
}) {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const YellowButton = styled(IconButton)({
    color: "#FFC32E",
  });
  const RedButton = styled(IconButton)({
    color: "#E50000",
  });
  const GreyCard = styled(Card)({
    backgroundColor: "#EAEAEA",
  });
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <GreyCard elevation={0}>
      <Grid
        container
        direction="row"
        wrap="nowrap"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Grid container direction="column" item spacing={0}>
          <Grid item>
            <Text
              variant="h5"
              align="left"
              color="primary"
              sx={{
                fontWeight: "bold",
                lineHeight: 1.2,
              }}
            >
              {props.name}
            </Text>
          </Grid>
          <Grid item>
            <Text
              variant="body1"
              align="left"
              color="primary"
              sx={{ lineHeight: 1.2 }}
            >
              {props.dept}
            </Text>
          </Grid>
          <Grid item>
            <Text
              variant="body1"
              align="left"
              color="primary"
              sx={{ lineHeight: 1.2 }}
            >
              {formatter.format(props.salary)}
            </Text>
          </Grid>
        </Grid>
        <Grid container direction="row" item xs="auto" wrap="nowrap">
          <Grid item>
            <YellowButton aria-label="edit">
              <EditIcon />
            </YellowButton>
          </Grid>
          <Grid item>
            <RedButton
              aria-label="delete"
              onClick={() => setDeleteDialog(true)}
            >
              <DeleteIcon />
            </RedButton>
            <Dialog
              open={deleteDialog}
              onClose={() => setDeleteDialog(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You'll lose all details about this employee!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
                <Button onClick={() => setDeleteDialog(false)} autoFocus>
                  Erase
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </GreyCard>
  );
}

export default EmployeeCard;
