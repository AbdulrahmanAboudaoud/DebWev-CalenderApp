import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/app/home');
  };

  return (
    <div className="Login">
      <h1>Hello.</h1>
      <p>Welcome back</p>
      <div className="form-container">
        <h2>Email</h2>
        <input className="form-container-input-email" type="text" placeholder="Enter email" />
        <h2>Passwordddd</h2>
        <input className="form-container-input-password" type="password" placeholder="Enter password" />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
