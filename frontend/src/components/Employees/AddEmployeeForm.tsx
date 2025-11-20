import React, {useState} from 'react';
import {employeeApi} from "../../services/EmployeeApi";
import {Employee} from "../../types/Employee";

type NewEmployeeData = Omit<Employee, "id">;

interface AddEmployeeFromProps {
    onEmployeeAdded: (newEmployee: Employee) => void;
}

