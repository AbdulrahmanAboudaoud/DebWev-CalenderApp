const API_URL = "http://localhost:5000/api";
import { Employee } from "../types/Employee";

export const employeeApi = {
  // GET all employees
  getEmployees: async (): Promise<Employee[]> => {
    const response = await fetch(`${API_URL}/employees`);
    if (!response.ok) throw new Error("Failed to fetch employees");
    return response.json();
  },

  // GET employee by ID
  getEmployee: async (id: number): Promise<Employee> => {
    const response = await fetch(`${API_URL}/employees/${id}`);
    if (!response.ok) throw new Error("Employee not found");
    return response.json();
  },

  // POST new employee
  createEmployee: async (
    employee: Omit<Employee, "userId">
  ): Promise<Employee> => {
    try {
      const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create employee: ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("Other errors:", error);
      throw error;
    }
  },
};
