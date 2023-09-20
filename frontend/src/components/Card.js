import React from 'react';
import hearthSvg from '../images/heart.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like-btn ${isLiked && 'element__like-btn_active'}`
    );;

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <article className="element">
           {isOwn && <button type="button" aria-label="Удалить карточку" className="element__del-btn" onClick={handleDeleteClick}></button>}
            <img className="element__img" src={card.link} alt={card.name} onClick={() => onCardClick(card)}/>
            <div className="element__caption">
                <h2 className="element__title">{card.name}</h2>
                {/* <button type="button" className="element__like-btn"><img src="./images/heart.svg" alt="Кнопка сердечко"></></button> */}
                <div className="element__like-container">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    >
                        <img src={hearthSvg} alt="Кнопка сердечко" />
                    </button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;
