import { DEPARTMENT, employee } from "../parts/EmployeeCard";
import axios from "axios";

const empSite = "http://localhost:3001/employee/";
const authSite = "http://localhost:3001/auth/";

axios.defaults.headers.common["x-access-token"] =
  window.localStorage.getItem("token") || "";

export const getAllEmpBackend = () => axios.get(empSite);

export const getIdEmpBackend = (id: number) => axios.get(empSite + id);

export const deleteEmpBackend = (id: number) => axios.delete(empSite + id);

export const updateEmpBackend = (emp: employee) => {
  const { id, ...rest } = emp;
  return axios.patch(empSite + id, rest);
};

export const createEmpBackend = (emp: employee) => {
  const { id, ...rest } = emp;
  return axios.post(empSite, rest);
};

export const getUserBackend = (username: string) =>
  axios.get(authSite + username);

export const createUserBackend = (user: {
  username: string;
  password: string;
  department: DEPARTMENT;
}) => {
  return axios.post(authSite, user);
};

export const loginUserBackend = (user: {
  username: string;
  password: string;
}) => {
  return axios.post(authSite + "login", user);
};
