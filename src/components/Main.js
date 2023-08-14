import React from 'react';
import cngAvIcon from '../images/change-avatar-icon.svg';
import addBtn from '../images/add-btn-plus.svg';
import Card from "./Card.js";
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const CurrentUserInfo = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button type="button" className="profile__change-avatar-button"
          onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={CurrentUserInfo.avatar} alt="Аватар профиля." />
          <img className="profile__avatar-change-icon" src={cngAvIcon} alt="Карандаш." />
        </button>
        <div className="profile__info">
          <div className="profile__edit-box">
            <h1 className="profile__name">{CurrentUserInfo.name}</h1>
            <button type="button" className="profile__edit-button"
            onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__description">{CurrentUserInfo.about}</p>
        </div>
        <button type="button" className="profile__add-button"
        onClick={props.onAddPlace}>
          <img src={addBtn} alt="Плюс в рамке" />
        </button>
      </section>
      <section className="photo-grid">
        { props.cards.map(data => {
            return (
              <div key={data._id}>
                <Card 
                  card={data} 
                  onCardClick={props.onCardClick} 
                  onDeleteClick={props.onDeleteClick} 
                  onCardLike={props.onCardLike} 
                />
              </div>
            )
          }) }
      </section>
    </main>
  )
}

export default Main;