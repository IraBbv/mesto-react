import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUserInfo = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUserInfo._id;
  const isLiked = props.card.likes.some(i => i._id === currentUserInfo._id);
  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  );

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDelete() {
    props.onDeleteClick(props.card._id);
  }

  return (
    <div className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} 
      onClick={() => props.onCardClick(props.card)}/>
      {isOwn && <button className="card__trash-button" type="button" onClick={handleDelete} />}
      <div className="card__description">
        <h2 className="card__name">{props.card.name}</h2>
        <div className="card__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLike}></button>
          <span className="card__like-quantity">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;