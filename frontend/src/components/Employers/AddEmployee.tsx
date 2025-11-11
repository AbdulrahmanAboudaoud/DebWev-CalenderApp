// src/components/AddEmployee.tsx
import React, { useState } from 'react';
import { employeeApi } from '../../services/api';
import { Employee } from '../../types/Employee';

const AddEmployee: React.FC = () => {
    const [formData, setFormData] = useState<Omit<Employee, 'userId'>>({
        name: '',
        email: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await employeeApi.createEmployee(formData as Employee);
            alert('Employee created!');
            setFormData({ name: '', email: '' });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <button type="submit">Add Employee</button>
        </form>
    );
};