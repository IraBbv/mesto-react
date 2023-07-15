import React from 'react';
import cngAvIcon from '../images/change-avatar-icon.svg';
import addBtn from '../images/add-btn-plus.svg';
import api from '../utils/api.js';

function Main(props, isOpen) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  const [cards, setCards] = React.useState([]);

  React.useEffect( () => {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch(err => {
        return Promise.reject(`Ошибка: ${err}`);
      })
  });

  return (
    <main className="content">
      <section className="profile">
        <button type="button" className="profile__change-avatar-button"
          onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Аватар профиля." />
          <img className="profile__avatar-change-icon" src={cngAvIcon} alt="Карандаш." />
        </button>
        <div className="profile__info">
          <div className="profile__edit-box">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="profile__edit-button"
            onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button"
        onClick={props.onAddPlace}>
          <img src={addBtn} alt="Плюс в рамке" />
        </button>
      </section>
      <section className="photo-grid"></section>

      <template id="card-template">
        <div className="card">
          <img className="card__image" />
          <button type="button" className="card__trash-button"></button>
          <div className="card__description">
            <h2 className="card__name"></h2>
            <div className="card__like-container">
              <button type="button" className="card__like-button"></button>
              <span className="card__like-quantity">0</span>
            </div>
          </div>
        </div>
      </template>

    </main>
  )
}

export default Main;