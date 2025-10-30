// src/components/Dashboard/Dashboard.jsx

import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      {users ? (
        <div>
          {users.map((u) => (
            <h3 key={u._id}>{u.username}</h3>
          ))}
        </div>
      ) : (
        <p>No Users</p>
      )}
    </main>
  );
};

export default Dashboard;
