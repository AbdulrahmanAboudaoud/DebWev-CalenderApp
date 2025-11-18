// src/components/EmployeeList.tsx - FIXED VERSION
import React from 'react';
import { Employee } from '../../types/Employee';

interface Props {
    employees: Employee[];  // Add this interface
}

const EmployeeList: React.FC<Props> = ({ employees }) => {  // Receive employees as prop
    return (
        <div>
            <h2>Employees</h2>
            {employees.map(employee => (
                <div key={employee.userId}>
                    <p>{employee.name} - {employee.email}</p>
                </div>
            ))}
        </div>
    );
};

export default EmployeeList;