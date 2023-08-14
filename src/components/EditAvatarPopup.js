import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  

  return(
    <PopupWithForm 
      name='avatar' 
      title='Обновить аватар'
      button='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input className="form__input form__input_type_avatar" type="url" name="avatar"
             placeholder="Ссылка на фото" required />
      <span className="form__error-message avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;