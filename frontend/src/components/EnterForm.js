import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppContent from './AppContent';
import Header from './Header';
import Footer from './Footer';

function EnterForm({ title, buttonText, isLoginPage, onRegistrateUser, onLoginUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleClick() {
    isLoginPage ? onLoginUser({ password, email }) : onRegistrateUser({ password, email });
  }

  return (
    <>
        <div className='enter-form'>
          <h2 className='enter-form__title'>{title}</h2>
          <div className='enter-form__form'>
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} className='enter-form__input' placeholder='Email' />
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className='enter-form__input' placeholder='Пароль' />
          </div>
          <button className='enter-form__button' onClick={handleClick}>{buttonText}</button>

          {
            isLoginPage ? null : <h3 className='enter-form__subtitle'>Уже зарегистрированы? <Link to='/sign-in' className='enter-form__enter-link'>&nbsp;Войти</Link></h3>
          }

          
        </div>
    </>
  );
}

export default EnterForm;
