import { API_URL, getAuthHeaders } from "./apiConfig";
import { Employee } from "../types/Employee";

export const employeeApi = {
  // GET all employees
  getEmployees: async (): Promise<Employee[]> => {
    const response = await fetch(`${API_URL}/employees`, {
      headers: {
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // GET employee by ID
  getEmployee: async (id: number): Promise<Employee> => {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      headers: {
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // POST new employee
  createEmployee: async (employee: Omit<Employee, "userId">): Promise<Employee> => {
    const response = await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(employee),
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};
