// src/components/AddEmployee.tsx
import React, { useState } from "react";
import { employeeApi } from "../../services/api";
import { Employee } from "../../types/Employee";

// Adds a prop to pass to the mother component (employee managemnt)
interface Props {
    onEmployeeAdded: (newEmployee: Employee) => void;
}

const AddEmployee: React.FC<Props> = ({onEmployeeAdded}) => {
  const [formData, setFormData] = useState<Omit<Employee, "userId">>({
    name: "",
    email: "",
    role: "Employee", // This is a default
    department: "",
    password: "default123", // Also a default for a new employee
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEmployee = await employeeApi.createEmployee(formData as Employee);

      onEmployeeAdded(newEmployee);

      setFormData({
        name: "",
        email: "",
        role: "Employee",
        department: "",
        password: "default123",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Employee</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="role"
        placeholder="Role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        required
      />
      <input
        type="department"
        placeholder="Department"
        value={formData.department}
        onChange={(e) =>
          setFormData({ ...formData, department: e.target.value })
        }
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
