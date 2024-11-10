import './Login.scss';
import React, { FC, useEffect, useRef, useState } from 'react';
import { UserModel } from '../../models/UserModel.model';
import { useNavigate, useLocation } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { _setUser, addUser, checkUserPass } from '../../redux/slices/UsersSlice';
import PopUpMessage from '../popUpMessage/popUpMessage';
import { openModal } from '../../redux/slices/massegeSlice';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('')
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const truePassword = useSelector((store: any) => store.UsersSlice.truePassword);
  const notExistUser = useSelector((store: any) => store.UsersSlice.notExistUser);
  const firstRender = useRef(true);
  const [errorMessage, setErrorMessage] = useState(0);

  const handleUserClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission
    const u: any = new UserModel(userName, userPassword);
    dispatch(checkUserPass(u));
    setErrorMessage((prevErrorMessage => prevErrorMessage + 1));
  };
  
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (truePassword && !notExistUser) {
      setUserPassword('');
      setUserName('');
      navigate('/Home');
      dispatch(openModal({ title: "הצלחה", body: "התחברת בהצלחה,ברוך בואך"  }))
    } else if (!truePassword && !notExistUser) {
      // alert('סיסמא שגויה');
     dispatch(openModal({ title: "כשלון", body: "סיסמה שגויה נסה שנית"  }))
      setUserPassword('');
    } else if (notExistUser) {
      setUserPassword('');
      setUserName('');
      dispatch(openModal({ title: "הצלחה", body:userName+" "+"נרשמת למערכת בהצלחה" }))
      // alert(userName+" "+"נרשמת בהצלחה")
      navigate('/Home');
    }
  }, [truePassword, notExistUser,errorMessage, navigate]);
  const massage = useSelector((store: any) => store.massegeSlice.massage);

  useEffect(() => {

   
  }, [massage]);

  return (
    <div>
      <img src="/לוגו מעודכן.png" alt="FurniHub Logo" className="logo" />
      <div className="container">
        <h1>Welcome To FurniHub</h1>
        <form>
          <div className="form-group">
            <label htmlFor="userName">שם משתמש</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={handleUserNameChange}
              required
            //לשמור בסטייט הלוקלי את שם המשתמש
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">סיסמא</label>
            <input type="password" id="password" required name="password" value={userPassword} onChange={handleUserPasswordChange} />
          </div>
          <button type="submit" onClick={handleUserClick}>התחבר</button>
        </form>
        <div className="footer">
          <p>שכחת את הסיסמא? <a href="">שחזור סיסמא</a></p>
          <p>אין לך חשבון? <a href="">הרשמה</a></p>
        </div>
      </div>
      <PopUpMessage></PopUpMessage>

    </div>
  );
};

export default Login;
