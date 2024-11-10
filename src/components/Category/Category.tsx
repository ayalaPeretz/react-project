import React, { FC } from 'react';
import './Category.scss';
import { Outlet } from 'react-router-dom';

interface CategoryProps {}

const Category: FC<CategoryProps> = () => (
  <div className="Category">
 

    
      <div ><Outlet></Outlet></div>

  </div>
);

export default Category;
