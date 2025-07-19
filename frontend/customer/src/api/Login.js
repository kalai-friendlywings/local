import React, { useState } from "react";
import API, { setAuthToken } from "../api/client"; // your axios instance

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/token/", { username, password });
      const accessToken = response.data.access;
      
      // Save token to localStorage
      localStorage.setItem("access", accessToken);
      
      // Set token in axios headers
      setAuthToken(accessToken);
      
      // Notify parent or redirect
      onLoginSuccess && onLoginSuccess();

    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
