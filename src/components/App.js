import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [deletedCardId, setDeletedCardId] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  // юзер и карточки
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData);
      })
      .catch(err => {
        return Promise.reject(`Ошибка: ${err}`);
      })
  }, []);
  
  // открытие/закрытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteClick(cardId) {
    setIsDeletePopupOpen(true);
    setDeletedCardId(cardId)
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true)
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard({});
  }

  // лайк на карточку
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.removeLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          return Promise.reject(`Ошибка: ${err}`);
        });
    } else {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          return Promise.reject(`Ошибка: ${err}`);
        });
    }
  }
  
  // удаление карточки
  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    api.deleteCard(deletedCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deletedCardId
        }))
        closeAllPopups();
      })
      .catch(err => {
        return Promise.reject(`Ошибка: ${err}`);
      })
  }

  // 
  function handleUpdateUser(dataUser) {
    api.editProfileInfo(dataUser)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        return Promise.reject(`Ошибка: ${err}`);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          onDeleteClick={handleDeleteClick}
          cards={cards} 
          onCardLike={handleCardLike}
        />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name='add'
          title='Новое место'
          button='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <input type="text" name="location" className="form__input form__input_type_location" minLength="2" maxLength="30"
                placeholder="Название" required />
              <span className="form__error-message location-error"></span>
              <input name="link" className="form__input form__input_type_link" type="url" placeholder="Ссылка на картинку" 
                required />
              <span className="form__error-message link-error"></span>
            </>
          }
        />
        <PopupWithForm 
          name='confirm'
          title='Вы уверены?'
          button='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          isDeletePopup={true}
          onSubmit={handleDeleteSubmit}
        />
        <ImagePopup 
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  )

}

export default App;
