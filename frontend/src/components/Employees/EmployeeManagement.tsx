// src/components/EmployeeManagement.tsx
import React, { useState, useEffect } from 'react';
import { employeeApi } from '../../services/api';
import { Employee } from '../../types/Employee';
import AddEmployee from './AddEmployee';
import EmployeeList from './EmployeeList';

const EmployeeManagement: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const loadEmployees = async () => {
        try {
            const data = await employeeApi.getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Error loading employees:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleEmployeeAdded = (newEmployee: Employee) => {
        setEmployees(prev => [...prev, newEmployee]);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Employee Management</h1>
            <AddEmployee onEmployeeAdded={handleEmployeeAdded} />
            <EmployeeList employees={employees} />
        </div>
    );
};

export default EmployeeManagement;