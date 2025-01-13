import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetch('http://your-laravel-app.com/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/login');
        });
    }
  }, [navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <div>Welcome, {user.name}!</div>;
};

export default Dashboard;
