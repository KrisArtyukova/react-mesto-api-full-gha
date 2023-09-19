import React from 'react';
import Header from './Header';
import EnterForm from './EnterForm';
import { registerPage } from '../utils/constants';
import InfoPopup from './InfoPopup';

function Register({ onRegistrateUser, infoPopupIsOpen, infoPopupTitle, infoPopupError, closeInfoPopup }) {

  return (
    <>
        <Header currentPage={registerPage} />
        <EnterForm title='Регистрация' buttonText='Зарегистрироваться' isLoginPage={false} onRegistrateUser={onRegistrateUser} />
        <InfoPopup infoPopupIsOpen={infoPopupIsOpen} infoPopupTitle={infoPopupTitle} infoPopupError={infoPopupError} closeInfoPopup={closeInfoPopup} />
    </>
  );
}

export default Register;
