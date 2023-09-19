import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AppContent from './AppContent';
import Login from './Login';
import Register from './Register';
import { authApi } from '../utils/AuthApi';
import { USER_TOKEN } from '../utils/constants';
import { AuthContext } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoPopupIsOpen, setInfoPopupIsOpen] = useState(false);
  const [infoPopupTitle, setInfoPopupTitle] = useState('');

  const [infoPopupError, setInfoPopupError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    authApi.checkAuth()
    .then((response) => {
      setUserEmail(response.data.email);
      handleLogin();
    })
    .catch((error) => {
      console.log('error');
    });
  }, []);

  function setInfoPopup({ isOpen, title, error }) {
    setInfoPopupIsOpen(isOpen);
    setInfoPopupTitle(title);
    setInfoPopupError(error);
  }

  function closeInfoPopup() {
    setInfoPopupIsOpen(false);
  }

  function handleLogin() {
    setLoggedIn(true);
    navigate('/');
  }

  function onRegistrateUser({ password, email }) {
    authApi.registrate(password, email)
      .then((response) => {
        setInfoPopup({ isOpen: true, title: 'Вы успешно зарегистрировались!' });
        console.log(response);
      })
      .catch((error) => {
        setInfoPopup({ isOpen: true, title: 'Что-то пошло не так! Попробуйте ещё раз', error });
        console.log(error);
      })
      
  }

  function onLoginUser({ password, email }) {
    authApi.login(password, email)
      .then((response) => {
        localStorage.setItem(USER_TOKEN, response.token);
        setUserEmail(email);
        handleLogin();
      })
      .catch((error) => {
        setInfoPopup({ isOpen: true, title: 'Что-то пошло не так! Попробуйте ещё раз', error });
        console.log(error);
      })
      
  }

  function logout() {
    localStorage.removeItem(USER_TOKEN);
    setUserEmail('');
    setLoggedIn(false);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ logout, userEmail }}>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={AppContent} loggedIn={loggedIn} />} />
        <Route path='/sign-up' element={
            <Register 
              onRegistrateUser={onRegistrateUser} 
              infoPopupIsOpen={infoPopupIsOpen} 
              infoPopupTitle={infoPopupTitle} 
              infoPopupError={infoPopupError} 
              closeInfoPopup={closeInfoPopup}
            />}
        />
        <Route path='/sign-in' element={
          <Login 
            onLoginUser={onLoginUser} 
            infoPopupIsOpen={infoPopupIsOpen} 
            infoPopupTitle={infoPopupTitle} 
            infoPopupError={infoPopupError} 
            closeInfoPopup={closeInfoPopup} 
          />}
        />
        <Route path='*' element={loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
