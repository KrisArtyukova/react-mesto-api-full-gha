import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { usePopupClose } from '../hooks/usePopupClose';

function EditAvatarPopup({ isOpen, onUpdateAvatar, loading }) {
    const inputRef = useRef(null);
    usePopupClose(isOpen);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: inputRef.current.value,
        });
    }
    
    return (
        <PopupWithForm isOpen={isOpen} onSubmit={handleSubmit} title="Обновить аватар" name="edit_avatar" buttonText="Сохранить" loading={loading}>
            <div className="form__input-container">
            <input ref={inputRef} className="form__input form__input_type_src popup__input" placeholder="Ссылка на аватар" name="link" id="linkAvatar" type="url" required />
            <p className="popup__error popup__error_visible" id="error-link-avatar"></p>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
