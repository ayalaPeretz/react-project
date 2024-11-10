import React from 'react';
import './manegerWeb.scss';
import { useMyUser } from '../../hooks/user.hook';

const ManegerWeb = () => {
  const { user, loading, error } = useMyUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to fetch user name: {error}</p>;
  }

  return (
    <div className="manegerWeb">
      {user ? (
        <div>
          <p>{user.name.first} {user.name.last}</p>
          <img src={user.picture.large} alt="User" />
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default ManegerWeb;
