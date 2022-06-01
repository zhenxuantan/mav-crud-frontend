import { DEPARTMENT, employee } from "../parts/EmployeeCard";
import axios from "axios";

const empSite = "http://localhost:3001/employee/";
const authSite = "http://localhost:3001/auth/";

const AXIOS = () => {
  axios.defaults.headers.common["x-access-token"] =
    window.localStorage.getItem("token") || "";
  return axios;
};

export const getAllEmpBackend = () => AXIOS().get(empSite);
export const getIdEmpBackend = (id: number) => AXIOS().get(empSite + id);
export const deleteEmpBackend = (id: number) => AXIOS().delete(empSite + id);
export const updateEmpBackend = (emp: employee) => {
  const { id, ...rest } = emp;
  return AXIOS().patch(empSite + id, rest);
};
export const createEmpBackend = (emp: employee) => {
  const { id, ...rest } = emp;
  return AXIOS().post(empSite, rest);
};

export const checkTokenBackend = () => AXIOS().get(authSite + "token");
export const getUserBackend = (un: string) => AXIOS().get(authSite + un);
export const createUserBackend = (user: {
  username: string;
  password: string;
  department: DEPARTMENT;
}) => {
  return AXIOS().post(authSite, user);
};
export const loginUserBackend = (user: {
  username: string;
  password: string;
}) => {
  return AXIOS().post(authSite + "login", user);
};
