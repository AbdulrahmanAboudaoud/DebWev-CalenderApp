import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/AuthApi";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const result = await authApi.login({ email, password });

      // Save token + basic user info
      localStorage.setItem("token", result.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: result.userId,
          name: result.name,
          email: result.email,
          role: result.role,
        })
      );

      // Navigate based on role
      if (result.role === "Admin") {
        navigate("/app/home");
      } else {
        navigate("/app/home");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="Login">
      <h1>Hello.</h1>
      <p>Welcome back</p>
      <div className="form-container">
        <h2>Email</h2>
        <input
          className="form-container-input-email"
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2>Password</h2>
        <input
          className="form-container-input-password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
