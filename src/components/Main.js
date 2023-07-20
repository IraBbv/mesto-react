import React from 'react';
import cngAvIcon from '../images/change-avatar-icon.svg';
import addBtn from '../images/add-btn-plus.svg';
import api from '../utils/api.js';
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  // const [myId, setMyId] = React.useState('');

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        cardsData.forEach(elem => elem.myid = userData._id);
        setCards(cardsData);
      })
      .catch(err => {
        return Promise.reject(`Ошибка: ${err}`);
      })
  }, []);

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
      <section className="photo-grid">
        { cards.map(data => {
            return (
              <div className="card" key={data._id}>
                <Card card={data} onCardClick={props.onCardClick} />
              </div>
            )
          }) }
      </section>
    </main>
  )
}

export default Main;