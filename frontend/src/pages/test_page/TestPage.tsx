import './TestPage.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeesList from '../../components/Employees/EmployeesList';


function TestPage() {
  return (
    <div className="testPage">
        <EmployeesList />
    </div>
  );
}

export default TestPage;
