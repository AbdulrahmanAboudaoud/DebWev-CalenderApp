// src/components/EmployeesList.tsx
import React, {useEffect, useState} from 'react';
import {employeeApi} from '../../services/EmployeeApi';
import {Employee} from '../../types/Employee';

const EmployeesList: React.FC = () => {
    // Adds a state that holds the fetched data.
    const [employees, setEmployees] = useState<Employee[]>([]);
    // This tracks if the data has been loaded or not
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try
            {
                const response = await employeeApi.getEmployees(); // calls the typescript api that fetches the employees
                setEmployees(response);
            }
            catch (e)
            {
                console.error("Failed to fetch employees:", e);
            }
            finally {
                setLoading(false);
            }

        }
        fetchEmployees();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <h1>Employee Management</h1>
            {employees.map(employee => (
                <li key={employee.userId}>{employee.name}: {employee.email}</li>
            ))}
        </>
    );
};

export default EmployeesList;