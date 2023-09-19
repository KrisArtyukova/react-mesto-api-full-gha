import React from 'react';
import Union from '../images/Union.png';
import UnionRed from '../images/Union_red.png';

function InfoPopup({ infoPopupIsOpen, infoPopupTitle, infoPopupError, closeInfoPopup }) {
  return (
    <div className={`popup popup_img_view ${ infoPopupIsOpen ? 'popup_opened' : '' }`}>
        <div className="popup__container info-popup">
            <button type="button" aria-label="Закрыть" className="popup__close-icon popup__close-icon_add" onClick={closeInfoPopup} />
            <img className='info__img' src={infoPopupError ? UnionRed : Union} alt=""></img>
            <h2 className="popup__title info__title">{infoPopupTitle}</h2>
        </div>
    </div>
  );
}

export default InfoPopup;
