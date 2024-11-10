import React from 'react';
import './Contact.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/massegeSlice';

const Contact = () => {


  const _dispatch=useDispatch();
  const Submit=()=>{
    _dispatch(openModal({ title: 'הצלחה', body:"הפניה נשלחה בהצלחה"}));
    

  }



  return (
    <div className="container2">
      <div className="left">
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email"><span className="required-star">*</span>אימייל </label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="name"><span className="required-star">*</span>שם </label>
              <input type="text" id="name" name="name" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="code"><span className="required-star">*</span>קוד אימות</label>
              <input type="text" id="code" name="code" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone"><span className="required-star">*</span>טלפון </label>
              <input type="tel" id="phone" name="phone" required />
            </div>
          </div>
          <div className="form-group-full">
            <label htmlFor="message"><span className="required-star">*</span>הודעה</label>
            <textarea id="message" name="message" required placeholder="תוכן ההודעה..."></textarea>
          </div>
          <button type="submit" onClick={Submit}>שלח</button>
        </form>
      </div>
      <div className="right">
        <iframe
          src="https://embed.waze.com/iframe?zoom=15&lat=32.0853&lon=34.7818"
          width="600"
          height="420"
          title="Waze Map"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
