import './Login.css';

function Login() {
  return (
    <div className="Login">
      <h1>Hello.</h1>
      <p>Welcome back</p>
      <div className="form-container">
            <h2>Email</h2>
            <input className="form-container-input-email" type="text" placeholder="Enter email" />
            <h2>Password</h2>
            <input className="form-container-input-password" type="password" placeholder="Enter password" />
            <button>Login</button>
      </div>
    </div>
  );
}

export default Login;
