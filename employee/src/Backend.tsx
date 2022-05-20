import { employee } from "./EmployeeCard";

const backEndSite = "http://localhost:3001/employee/";

export const getAllEmpBackend = () =>
  fetch(backEndSite, {
    method: "GET",
    redirect: "follow",
  });

export const deleteEmpBackend = (id: number) =>
  fetch(backEndSite + id, {
    method: "DELETE",
    redirect: "follow",
  });

export const updateEmpBackend = (emp: employee) => {
  const { id, ...rest } = emp;
  return fetch(backEndSite + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
    redirect: "follow",
  });
};

export const createEmpBackend = (emp: employee) => {
  const { id, ...rest } = emp;
  return fetch(backEndSite, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
    redirect: "follow",
  });
};
