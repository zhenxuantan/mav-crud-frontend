import { Grid } from "@mui/material";
import { useState } from "react";
import EmployeeCard, { employee } from "./EmployeeCard";
import { deleteEmpBackend } from "./Backend";
import { openSnackbar } from "./redux/action";
import { useDispatch } from "react-redux";
import Footer from "./Footer";

function Dashboard(props: { employees: employee[]; setEmployees: Function }) {
  const { employees, setEmployees } = props;
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const deleteEmp = (id: number) => {
    setPage(
      Math.max(Math.min(Math.ceil((employees.length - 1) / 10) - 1, page), 0)
    );
    deleteEmpBackend(id)
      .then((response) => {
        if (response.status === 204) {
          dispatch(openSnackbar("Employee deleted", "success"));
          return response.text();
        } else if (response.status === 404) {
          dispatch(openSnackbar("Employee not found", "error"));
          return "";
        }
        throw new Error();
      })
      .catch((_error) => dispatch(openSnackbar("Server error", "error")));
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <Grid container spacing={2} justifyContent="space-between" p={1} mt={1}>
      {employees.slice(page * 10, page * 10 + 10).map((emp: employee) => (
        <EmployeeCard emp={emp} deleteEmp={deleteEmp} key={emp.id} />
      ))}
      <Footer page={page} setPage={setPage} employees={employees} />
    </Grid>
  );
}

export default Dashboard;
