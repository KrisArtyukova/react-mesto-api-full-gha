import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { api } from '../utils/Api';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import { AppContext } from '../contexts/AppContext';
import { mainPage } from '../utils/constants';
import defaultAvatar from '../images/photo.jpg';

function AppContent() {
  const [cards, setCards] = useState([]);
  const [currentUser, setUserInfo] = useState({
    name: '',
    about: '',
    avatar: defaultAvatar
  });
  const [isUserUpdateLoading, setIsUserUpdateLoading] = React.useState(false);
  const [isAvatarUpdateLoading, setIsAvatarUpdateLoading] = React.useState(false);
  const [isPlaceUpdateLoading, setIsPlaceUpdateLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  useEffect(() => {
    api.getUserInfo()
    .then((userInfo) => {
      setUserInfo(userInfo.data);
    })
    .catch(() => {
      console.log('Ошибка загрузки пользователя')
    })

    api.getInitialCards()
    .then((cards) => {
        setCards(cards.data);
    })
    .catch(() => {
        console.log('Ошибка загрузки карточек')
    })
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api.deleteLike(card._id).then((newCardData) => {
        const newCard = newCardData.data;
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      })
      .catch((error) => {
        console.log('Произошла ошибка при удалении лайка', error);
      })
    } else {
      api.addLike(card._id).then((newCardData) => {
        const newCard = newCardData.data;
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      })
      .catch((error) => {
        console.log('Произошла ошибка при отправке лайка', error);
      })
    }
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
        setCards((state) => state.filter((stateCard) => stateCard._id !== card._id));
    })
    .catch((error) => {
      console.log('Произошла ошибка при удалении карточки', error);
    })
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(userInfo) {
    setIsUserUpdateLoading(true);
    api.editUserInfo(userInfo.name, userInfo.about)
    .then((newUserInfo) => {
      setUserInfo(newUserInfo.data);
      closeAllPopups();
    })
    .catch(() => {
      console.log('Ошибка обновления пользователя')
    })
    .finally(() => setIsUserUpdateLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsAvatarUpdateLoading(true);
    api.editUserAvatar(avatar)
    .then((newUser) => {
      setUserInfo(newUser.data);
      closeAllPopups();
    })
    .catch(() => {
      console.log('Ошибка обновления аватара')
    })
    .finally(() => setIsAvatarUpdateLoading(false));
  }

  function handleAddPlaceSubmit({ cardName, cardLink }) {
    setIsPlaceUpdateLoading(true);
    api.addCard(cardName, cardLink)
    .then((newCard) => {
      setCards([newCard.data, ...cards]);
      closeAllPopups();
    })
    .catch(() => {
      console.log('Ошибка обновления аватара')
    })
    .finally(() => setIsPlaceUpdateLoading(false));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  return (
    <AppContext.Provider value={{ closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header currentPage={mainPage} />
        <CurrentCardContext.Provider value={cards}>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </CurrentCardContext.Provider>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          loading={isUserUpdateLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          loading={isPlaceUpdateLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          loading={isAvatarUpdateLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default AppContent;
