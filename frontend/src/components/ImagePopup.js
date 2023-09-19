import React from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card }) {
    const appContext = React.useContext(AppContext);
    usePopupClose(card.link);

    return (
        <div className={`popup popup_img_view ${ card.link ? 'popup_opened' : '' }`}>
            <figure className="popup__img-container">
                <button type="button" aria-label="Закрыть" className="popup__close-icon popup__close-icon_img" onClick={appContext.closeAllPopups}/>
                <img className="popup__img" src={card?.link} alt={card?.name} />
                <figcaption className="popup__caption">{card?.name}</figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;
