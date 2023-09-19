import React from 'react';
import Header from './Header';
import EnterForm from './EnterForm';
import { loginPage } from '../utils/constants';
import InfoPopup from './InfoPopup';

function Login({ infoPopupIsOpen, infoPopupTitle, infoPopupError, onLoginUser, closeInfoPopup }) {
  return (
    <>
        <Header currentPage={loginPage}/>
        <EnterForm title='Вход' buttonText='Вход' isLoginPage={true} onLoginUser={onLoginUser} />
        <InfoPopup infoPopupIsOpen={infoPopupIsOpen} infoPopupTitle={infoPopupTitle} infoPopupError={infoPopupError} closeInfoPopup={closeInfoPopup} />
    </>
  );
}

export default Login;
