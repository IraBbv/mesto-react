import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleEditSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      description: description
    });
  }

  return(
    <PopupWithForm 
      name='edit'
      title='Редактировать профиль'
      button='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleEditSubmit} 
    >
      <input className="form__input form__input_type_name"
             type="text" name="name" minLength="2" maxLength="40" 
             placeholder="Имя" required
             value={name} onChange={handleNameChange}
      />
      <span className="form__error-message name-error"></span>
      <input className="form__input form__input_type_description"
             type="text" name="description" minLength="2" maxLength="400" 
             placeholder="О себе" required
             value={description} onChange={handleDescriptionChange}
      />
      <span className="form__error-message description-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;