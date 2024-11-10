// src/components/NavBar/NavBar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
const MyNavBar = () => {
  const navigate = useNavigate();

  //מערך קטגוריות רגיל
  const _dispatch = useDispatch();
  const categories = useSelector((store: any) => store.categorySlice.arrayName);

  return (
    <div className="navbar">
      <nav>
        <ul className="navbar-list">
          <li className="navbar-item"><Link to="">Home</Link></li>
          <li className="navbar-item"><Link to="About">About</Link></li>
          <li className="navbar-item">

            <div className="a">
              <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle id="dropdown-button" variant="secondary">
                  Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* יצירת אפשרות לכל קטגוריה בעזרת map */}
                  {categories.map((category: any, index: any) => (
                    <Dropdown.Item key={index} onClick={() => navigate(`Category/${category}`)}>
                      {/* const handleClick = (name: string) => {
                        navigate('/Home/NotFound', { state: { message: name } });
  }; */}
                      {category}
                    </Dropdown.Item>
                  ))}

                </Dropdown.Menu>
              </Dropdown>
            </div>

          </li>
          <li className="navbar-item"><Link to="Contact">Contact</Link></li>
          {/* <li className="navbar-item"><Link to="Cart">Cart</Link></li> */}
        </ul>
      </nav>
    </div>
  );
};

export default MyNavBar;
