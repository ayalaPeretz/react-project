import React, { FC, useEffect } from 'react';
import './Start.scss';
import { useNavigate } from 'react-router-dom';


const Start= () => {
  const navigate = useNavigate();
  const b = true;

  useEffect(() => {
    if (b) {
      navigate('/Home');
    }
  }, [b, navigate]);

  return (
    <div className="Login">
    </div>
  );
};

export default Start;
