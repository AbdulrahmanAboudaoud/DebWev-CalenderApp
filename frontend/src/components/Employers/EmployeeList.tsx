// src/components/EmployeeList.tsx
import React, { useEffect, useState } from 'react';
import { employeeApi } from '../../services/api';
import { Employee } from '../../types/Employee';

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await employeeApi.getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

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