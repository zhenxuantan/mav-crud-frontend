import { employee } from "./EmployeeCard";
import axios from "axios";

const backEndSite = "http://localhost:3001/employee/";

export const getAllEmpBackend = () => axios.get(backEndSite);

export const deleteEmpBackend = (id: number) => axios.delete(backEndSite + id);

export const updateEmpBackend = (emp: employee) => {
  const { id, ...rest } = emp;
  return axios.patch(backEndSite + id, rest);
};

export const createEmpBackend = (emp: employee) => {
  const { id, ...rest } = emp;
  return axios.post(backEndSite, rest);
};
