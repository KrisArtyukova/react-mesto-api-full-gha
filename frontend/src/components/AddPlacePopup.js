import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { usePopupClose } from '../hooks/usePopupClose';

function AddPlacePopup({ isOpen, onAddCard, loading }) {
    const [cardName, setCardName] = useState('');
    const [cardLink, setCardLink] = useState('');
    usePopupClose(isOpen);

    useEffect(() => {
        setCardName('');
        setCardLink('');
    }, [isOpen]);
     

    const handleChangeCardName = (event) => setCardName(event.target.value);
    const handleChangeCardLink = (event) => setCardLink(event.target.value);


    function handleSubmit(event) {
        // Запрещаем браузеру переходить по адресу формы
        event.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddCard({
            cardName,
            cardLink,
        });
    }
    
    return (
        <PopupWithForm isOpen={isOpen} onSubmit={handleSubmit} title="Новое место" name="cards_add" buttonText="Сохранить" loading={loading}>
            <div className="form__input-container">
                <input value={cardName} onChange={handleChangeCardName} className="form__input form__input_type_title popup__input" placeholder="Название" name="title" id="title" required minLength="2" maxLength="30" />
                <p className="popup__error popup__error_visible" id="error-title"></p>
            </div>
            <div className="form__input-container">
                <input value={cardLink} onChange={handleChangeCardLink} className="form__input form__input_type_src popup__input" placeholder="Ссылка на картинку" name="link" id="link" type="url" required />
                <p className="popup__error popup__error_visible" id="error-link"></p>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
