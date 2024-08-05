import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Fetch user list');
    // TODO: Thực hiện yêu cầu lấy danh sách người dùng từ server
    setUsers([
      { username: 'user1', email: 'user1@example.com' },
      { username: 'user2', email: 'user2@example.com' }
    ]);
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
