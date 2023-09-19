import React from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({ title, name, isOpen, buttonText, onSubmit, children, loading }) {
    const appContext = React.useContext(AppContext);
    usePopupClose(isOpen);

    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="popup__close-icon popup__close-icon_add" onClick={appContext.closeAllPopups}/>
                <h2 className="popup__title">{title}</h2>
                <form className="form popup__form" name={name} onSubmit={onSubmit}>
                    {children}
                    <button className="form__btn popup__button" type="submit">
                        {loading ? `${buttonText}...` : buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;