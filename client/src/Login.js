import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login:', { username, password });

    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.status === 200) {
        navigate('/users'); // Điều hướng tới trang UserList sau khi đăng nhập thành công
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={!username || !password}>
        Login
      </button>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </form>
  );
};

export default Login;
