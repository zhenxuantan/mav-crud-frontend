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
  Link,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";

export enum DEPARTMENT {
  HR = "HR",
  PS = "PS",
}

export interface employee {
  id: number;
  name: string;
  salary: number;
  department: DEPARTMENT;
}

function EmployeeCard(props: { emp: employee; deleteEmp: Function }) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { emp, deleteEmp } = props;

  const YellowButton = styled(IconButton)({
    color: "#FFC32E",
  });
  const RedButton = styled(IconButton)({
    color: "#E50000",
  });
  const GreyCard = styled(Card)({
    backgroundColor: "#EAEAEA",
    width: "100%",
    maxWidth: "30rem",
  });
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
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
              {emp.name}
            </Text>
          </Grid>
          <Grid item>
            <Text
              variant="body1"
              align="left"
              color="primary"
              sx={{ lineHeight: 1.2 }}
            >
              {emp.department}
            </Text>
          </Grid>
          <Grid item>
            <Text
              variant="body1"
              align="left"
              color="primary"
              sx={{ lineHeight: 1.2 }}
            >
              {formatter.format(emp.salary)}
            </Text>
          </Grid>
        </Grid>
        <Grid container direction="row" item xs="auto" wrap="nowrap">
          <Grid item>
            <Link component={RouterLink} to={"/update/" + emp.id}>
              <YellowButton aria-label="edit">
                <EditIcon />
              </YellowButton>
            </Link>
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
                <Button
                  onClick={() => {
                    setDeleteDialog(false);
                    deleteEmp(emp.id);
                  }}
                  autoFocus
                >
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
