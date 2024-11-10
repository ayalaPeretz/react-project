import React, { FC, useEffect, useState } from 'react';
import './Home.scss';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import MyNavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Login/Login';
import { UserModel } from '../../models/UserModel.model';
import { _setUser } from '../../redux/slices/UsersSlice';
import { cleanSearch, updateCategoryBySearch } from '../../redux/slices/categorySlice';
import PopUpMessage from '../popUpMessage/popUpMessage';
import { openModal } from '../../redux/slices/massegeSlice';
import ManegerWeb from '../manegerWeb/manegerWeb';

const Home: FC = () => {
  const [countCart, setCountCart] = useState(0);//משתנה לאחסון כמות הפריטים בסל
  const [searchTerm, setSearchTerm] = useState<any>(''); // משתנה סטייט לאחסון מילת החיפוש
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //מערך קטגוריות רגיל
  const arrayName = useSelector((store: any) => store.categorySlice.arrayName);
  const massage = useSelector((store: any) => store.massegeSlice.massage);
  //שליפת המשתמש הנוכחי לצורך שינוי שמו בעמוד זה
  const user = useSelector((store: any) => store.UsersSlice.user);
  const [userName, setUserName] = useState(user.userName);


  //בחיפוש כאשר משתמש לוחץ על אנטר הוא מועבר לפונקצית החיפוש
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchClick();
    }
  };
  //פונקצית חיפוש
  const searchClick = () => {
    debugger
    dispatch(updateCategoryBySearch(searchTerm))

  };
  //פונקציה שמאפסת לי את שם המשתמש כדי שהמתמש יוכל להתנתק
  const cleanName = () => {
    setUserName("")
    const m = new UserModel("", "")
    dispatch(_setUser(m))

  }
  const clearValue = () => { 
    setSearchTerm("")   
    dispatch(cleanSearch())
  }

  useEffect(() => {
  }, [massage]);

  return (
    <div className="Home">
      {/* header */}
      <div className="header">
        <div className="header-left">
          <img src="/לוגו מעודכן.png" alt="Click&Buy" className="logo" />
          <span className="tagline">קל יותר לקנות בקליק</span>
        </div>

        <div className="header-right">
          <span className="phone-number">*3866</span>
          <div>
            {userName === "" ? (
              <div className="auth-links">
                <div onClick={() => { navigate('/Login'); }} className="login-link">התחברות</div>
                <span className="separator">|</span>
                <div onClick={() => { navigate('/Login'); }} className="login-link">הרשמה</div>
              </div>
            ) : (
              <div className="auth-links">
                <div className='login-link-p'>שלום {userName}</div>
                <span className="separator">|</span>
                <div onClick={cleanName} className="login-link">התנתקות</div>
              </div>
            )}
          </div>

          <div className="cart" onClick={() => navigate('Cart')}>
            <img src="איכון סל קניות.png" alt="Cart" />
            <span className="cart-count">({countCart})</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="input-container">
          <input
            type="text"
            placeholder="....חיפוש קטגוריה נבחרת שלנו"
            autoComplete="off"
            value={searchTerm}
            className="main_search_input"
            name="q"
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchTerm(e.target.value)}
            
          />
          {searchTerm && (
           
            <button className="clear-button" onClick={clearValue}>
            X
          </button>
          )}
        </div>
        
      </div>
      {/* nuvBar */}
      <div className="MyNavBar"><MyNavBar></MyNavBar></div>
      <div ><Outlet></Outlet></div>
      <PopUpMessage></PopUpMessage>
    </div>
  );
};

export default Home;
