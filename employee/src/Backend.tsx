import { employee } from "./EmployeeCard";

const backEndSite = "http://localhost:3001/employee/";

export const getAllEmpBackend = () =>
  fetch(backEndSite, {
    method: "GET",
    redirect: "follow",
  }).then((response) => response.json());

export const deleteEmpBackend = (id: number) =>
  fetch(backEndSite + id, {
    method: "DELETE",
    redirect: "follow",
  }).then((response) => response.text());

export const updateEmpBackend = (emp: employee) => {
  const { id, ...rest } = emp;
  return fetch(backEndSite + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
    redirect: "follow",
  }).then((response) => response.json());
};

export const createEmpBackend = (emp: employee) => {
  const { id, ...rest } = emp;
  return fetch(backEndSite, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
    redirect: "follow",
  }).then((response) => response.json());
};
