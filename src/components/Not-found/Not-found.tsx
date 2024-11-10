import React from 'react';
import { useLocation } from 'react-router-dom';
import './Not-found.scss'; // שינוי כאן

const NotFound = () => {
  const location = useLocation();
  const message = location.state?.message || 'Page Not Found';

  return (
    <div className="not-found-container">
      <p className="not-found-message">....בקטגורית {message} המסך בשיפוצים</p>
    </div>
  );
};

export default NotFound;
