import { Typography as Text, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { employee } from "./EmployeeCard";
import { setPage, State } from "./redux/reduxSlice";
import { useDispatch, useSelector } from "react-redux";

function Footer(props: { employees: employee[] }) {
  const { employees } = props;
  const dispatch = useDispatch();
  const page = useSelector((state: State) => state.page);
  const loading = useSelector((state: State) => state.loading);

  const PageButton = styled(Button)({
    textTransform: "none",
    fontSize: "1rem",
    minWidth: 0,
    "&:hover": {
      backgroundColor: "#E1E1E1",
      textDecoration: "underline",
    },
  });

  return (
    <Grid
      container
      item
      wrap="nowrap"
      alignItems="center"
      justifyContent="center"
    >
      {employees.length > 0 ? (
        <Grid
          item
          xs="auto"
          sx={{ display: { sm: "flex", xs: "none" } }}
          alignItems="left"
          mr="auto"
        >
          <Text variant="body1" align="left" color="primary">
            Showing{" "}
            <b>
              {page * 10 + 1}-{Math.min(page * 10 + 10, employees.length)}
            </b>{" "}
            out of <b>{employees.length}</b> entries
          </Text>
        </Grid>
      ) : (
        loading || (
          <Grid item>
            <Text variant="h5" color="primary" align="center">
              <b>
                There are currently no employees. You can add them via the
                button at the top of the page.
              </b>
            </Text>
          </Grid>
        )
      )}
      {employees.length > 10 && (
        <Grid
          item
          container
          xs="auto"
          alignItems="center"
          spacing={2}
          ml="auto"
        >
          <Grid item>
            <PageButton
              color="primary"
              disabled={page === 0}
              onClick={() => dispatch(setPage(page - 1))}
            >
              Previous
            </PageButton>
          </Grid>
          <Grid item>
            <Text sx={{ fontSize: "1rem" }} color="primary">
              <b>{page + 1}</b>
            </Text>
          </Grid>
          <Grid item>
            <PageButton
              color="primary"
              disabled={page === Math.ceil(employees.length / 10) - 1}
              onClick={() => dispatch(setPage(page + 1))}
            >
              Next
            </PageButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default Footer;
