import React, { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { usePopupClose } from '../hooks/usePopupClose';

function EditProfilePopup({ isOpen, onUpdateUser, loading }) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    usePopupClose(isOpen);
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser?.name);
            setDescription(currentUser?.about);
        }
    }, [currentUser, isOpen]);

    function handleSubmit(event) {
        // Запрещаем браузеру переходить по адресу формы
        event.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }
    
    return (
        <PopupWithForm 
            isOpen={isOpen} 
            title="Редактировать профиль" 
            name="edit_profile" 
            buttonText="Сохранить"
            onSubmit={handleSubmit}
            loading={loading}
        >
            <div className="form__input-container">
                <input 
                    value={name || ''} 
                    className="form__input form__input_type_name popup__input" 
                    placeholder="Введите имя"
                    name="name" 
                    id="name" 
                    required 
                    minLength="2" 
                    maxLength="40" 
                    onChange={(event) => setName(event.target.value)}
                />
                <p className="popup__error popup__error_visible" id="error-name"></p>
            </div>
            <div className="form__input-container">
                <input 
                    value={description || ''} 
                    className="form__input form__input_type_info popup__input" 
                    placeholder="О себе" 
                    name="info" 
                    id="info" 
                    required 
                    minLength="2" 
                    maxLength="200"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <p className="popup__error popup__error_visible" id="error-info"></p>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
