import './TestPage.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeManagement from '../../components/Employees/EmployeeManagement';


function TestPage() {
  return (
    <div className="testPage">
      <h2>Employer Test Page</h2>
      <div className="employee-section">
        <EmployeeManagement />
      </div>
    </div>
  );
}

export default TestPage;
