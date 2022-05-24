import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { employee } from "../EmployeeCard";

export interface State {
  toggleSnackbar: boolean;
  severity: string;
  message: string;
  employees: employee[];
}

const initialState: State = {
  toggleSnackbar: false,
  severity: "info",
  message: "",
  employees: [],
};

const reduxSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    openSnackbarError(state: State, message: PayloadAction<string>) {
      state = {
        ...state,
        toggleSnackbar: true,
        message: message.payload,
        severity: "error",
      };
    },
    openSnackbarSuccess(state: State, message: PayloadAction<string>) {
      state = {
        ...state,
        toggleSnackbar: true,
        message: message.payload,
        severity: "success",
      };
    },
    openSnackbarInfo(state: State, message: PayloadAction<string>) {
      state = {
        ...state,
        toggleSnackbar: true,
        message: message.payload,
        severity: "info",
      };
    },
    closeSnackbar(state) {
      state.toggleSnackbar = false;
    },
    addEmployee(state: State, employee: PayloadAction<employee>) {
      state.employees = [...state.employees, employee.payload];
    },
    deleteEmployee(state: State, id: PayloadAction<number>) {
      state.employees = [
        ...state.employees.filter((emp) => emp.id !== id.payload),
      ];
    },
    updateEmployee(state: State, employee: PayloadAction<employee>) {
      const id: number = employee.payload.id;
      state.employees = [
        ...state.employees.map((emp) =>
          emp.id === id ? employee.payload : emp
        ),
      ];
    },
    setEmployees(state: State, employees: PayloadAction<employee[]>) {
      state.employees = [...employees.payload];
    },
  },
});

export const {
  openSnackbarError,
  openSnackbarSuccess,
  openSnackbarInfo,
  closeSnackbar,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  setEmployees,
} = reduxSlice.actions;
export default reduxSlice.reducer;
