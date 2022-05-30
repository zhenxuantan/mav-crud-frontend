import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { employee } from "../parts/EmployeeCard";

export interface State {
  toggleSnackbar: boolean;
  severity: string;
  message: string;
  employees: employee[];
  page: number;
  error: boolean;
  loading: boolean;
}

const initialState: State = {
  toggleSnackbar: false,
  severity: "info",
  message: "",
  employees: [],
  page: 0,
  error: false,
  loading: true,
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
      return state;
    },
    openSnackbarSuccess(state: State, message: PayloadAction<string>) {
      state = {
        ...state,
        toggleSnackbar: true,
        message: message.payload,
        severity: "success",
      };
      return state;
    },
    openSnackbarInfo(state: State, message: PayloadAction<string>) {
      state = {
        ...state,
        toggleSnackbar: true,
        message: message.payload,
        severity: "info",
      };
      return state;
    },
    closeSnackbar(state) {
      state = { ...state, toggleSnackbar: false };
      return state;
    },
    addEmployee(state: State, action: PayloadAction<employee>) {
      state = { ...state, employees: [...state.employees, action.payload] };
      return state;
    },
    deleteEmployee(state: State, action: PayloadAction<number>) {
      state = {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
      return state;
    },
    updateEmployee(state: State, action: PayloadAction<employee>) {
      const id: number = action.payload.id;
      state = {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === id ? action.payload : emp
        ),
      };
      return state;
    },
    setEmployees(state: State, action: PayloadAction<employee[]>) {
      state = { ...state, employees: action.payload, error: false };
      return state;
    },
    setPage(state: State, action: PayloadAction<number>) {
      state = { ...state, page: action.payload };
      return state;
    },
    errorPage(state: State) {
      state = { ...state, error: true };
      return state;
    },
    setLoading(state: State, action: PayloadAction<boolean>) {
      state = { ...state, loading: action.payload };
      return state;
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
  setPage,
  errorPage,
  setLoading,
} = reduxSlice.actions;
export default reduxSlice.reducer;
