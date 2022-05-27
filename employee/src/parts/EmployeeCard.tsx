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
  const PlainButton = styled(Button)({
    textTransform: "none",
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
    <Grid
      item
      container
      xs={12}
      sm={12}
      md={6}
      alignItems="center"
      justifyContent="center"
    >
      <GreyCard elevation={0} sx={{ height: "100%", borderRadius: "3px" }}>
        <Grid
          container
          direction="row"
          wrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
          pb={1}
          pr={1}
          m={0}
          spacing={1}
          sx={{ height: "100%" }}
        >
          <Grid
            container
            direction="column"
            item
            spacing={0}
            wrap="wrap"
            xs={8}
            p={0}
          >
            <Grid item>
              <Text
                variant="h5"
                align="left"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  wordWrap: "break-word",
                }}
                maxWidth="20rem"
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
          <Grid container direction="row" item xs="auto" wrap="nowrap" mr={0.5}>
            <Grid item>
              <Link component={RouterLink} to={"/update/" + emp.id}>
                <YellowButton>
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
              >
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    You'll lose all details about this employee!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <PlainButton onClick={() => setDeleteDialog(false)}>
                    Cancel
                  </PlainButton>
                  <PlainButton
                    onClick={() => {
                      setDeleteDialog(false);
                      deleteEmp(emp.id);
                    }}
                    autoFocus
                  >
                    Erase
                  </PlainButton>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </GreyCard>
    </Grid>
  );
}

export default EmployeeCard;
