import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:5000/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchUsers();
  }, [navigate]);
  

  const handleLogout = () => {
    // Xử lý đăng xuất (xóa token hoặc thông tin đăng nhập)
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
    navigate('/login'); // Chuyển hướng đến màn hình đăng nhập
  };

  return (
    <>
      <div className="user-list">
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>{user.username}</span>
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </>
  );
};

export default UserList;
