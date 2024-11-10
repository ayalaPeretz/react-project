import React, { FC, useEffect, useState } from 'react';
import './Main-home-page.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { toBePartiallyChecked } from '@testing-library/jest-dom/matchers';

interface MainHomePageProps { }

const MainHomePage: FC<MainHomePageProps> = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [num, setNum] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [clickP,setclickP]=useState("")
  const items = useSelector((store: any) => store.categorySlice.items);

  const handleClick = (name: string) => {
    navigate('/Home/NotFound', { state: { message: name } });
  };

  //פונקציות המשמשות לפתיחה וסגירה של המודל
  const openPopup1 = () => {
    setNum(1)
    setModalShow(true)
    setTitle("הסרת קטגוריה")
    setclickP("הסרה")
  };
  const openPopup2 = () => {
    setNum(2)
    setModalShow(true)
    setTitle("הוספת קטגוריה")
    setclickP("הוספה")
  };
  const closePopup = () => {
    setModalShow(false)
  };


  return (
    <div className="MainHomePage">
      <div className="mainFont">הקטגוריות המובילות שלנו</div>
      <div className="button-container">
        <button className="button" onClick={openPopup2}>הוספת קטגוריה</button>
        <button className="button" onClick={openPopup1}>הסרת קטגוריה</button>
      </div>
      <div className="categoryPicture">
        {items.map((item: any, index: any) => (
          <div key={index} className="item">
            <a onClick={() => handleClick(item.name)}>
              <img src={item.src} alt={`p${index + 1}`} />
              <h3 className="category-title">
                <span>{item.name}</span>
              </h3>
            </a>
          </div>
        ))}
      </div>
      <Popup
        show={modalShow}
        onHide={closePopup}
        display={num}
        title={title}
        clickP={clickP}
      />

    </div>
  );
};

export default MainHomePage;
