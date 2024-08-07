import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !email || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    if (!validateUsername(username)) {
      setErrorMessage('Username must be 3-20 characters long and can only contain letters, numbers, and underscores');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', { username, email, password });
      if (response.status === 201) {
        alert("Register successfull, navigate to Login")
        navigate('/login'); // Điều hướng tới trang đăng nhập sau khi đăng ký thành công
      } else if (response.data.message) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit" disabled={!username || !email || !password}>
        Register
      </button>
      <p>
        Wanna login? <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default Register;
