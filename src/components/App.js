import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  return (
    <div className="App page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick} />
      <Footer />
      <PopupWithForm 
        name='avatar' 
        title='Обновить аватар'
        button='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input className="form__input form__input_type_avatar" type="url" name="avatar"
              placeholder="Ссылка на фото" required />
            <span className="form__error-message avatar-error"></span>
          </>
        }
      />
      <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        button='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input type="text" name="name" className="form__input form__input_type_name" minLength="2" maxLength="40" 
              placeholder="Имя" required />
            <span className="form__error-message name-error"></span>
            <input type="text" name="description" className="form__input form__input_type_description" minLength="2" maxLength="400" 
              placeholder="О себе" required />
            <span className="form__error-message description-error"></span>
          </>
        } 
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
        onClose={closeAllPopups}
      />
      <ImagePopup 
        onClose={closeAllPopups}
      />
    </div>
  )

}

export default App;
