import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleEditAvatarSubmit(evt) {
    evt.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return(
    <PopupWithForm 
      name='avatar' 
      title='Обновить аватар'
      button='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleEditAvatarSubmit}
    >
      <input 
        className="form__input form__input_type_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на фото"
        required
        ref={avatarRef}
      />
      <span className="form__error-message avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;